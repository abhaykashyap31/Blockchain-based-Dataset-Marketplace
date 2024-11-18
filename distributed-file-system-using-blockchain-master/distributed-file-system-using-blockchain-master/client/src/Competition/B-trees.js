import readline from 'readline';
const jsonData = require('./competitions.json');

class BTreeNode {
  constructor(isLeaf = true) {
    this.keys = [];
    this.values = [];
    this.children = [];
    this.isLeaf = isLeaf;
  }
}

class BTree {
  constructor(minDegree = 2) {
    this.root = new BTreeNode();
    this.minDegree = minDegree;
  }

  insert(key, value) {
    const root = this.root;
    if (root.keys.length === 2 * this.minDegree - 1) {
      const newNode = new BTreeNode(false);
      newNode.children.push(root);
      this.splitChild(newNode, 0);
      this.root = newNode;
      this._insertNonFull(newNode, key, value);
    } else {
      this._insertNonFull(root, key, value);
    }
  }

  splitChild(node, index) {
    const minDegree = this.minDegree;
    const fullNode = node.children[index];
    const newNode = new BTreeNode(fullNode.isLeaf);

    newNode.keys = fullNode.keys.splice(minDegree);
    newNode.values = fullNode.values.splice(minDegree);

    if (!fullNode.isLeaf) {
      newNode.children = fullNode.children.splice(minDegree);
    }

    node.keys.splice(index, 0, fullNode.keys.pop());
    node.values.splice(index, 0, fullNode.values.pop());
    node.children.splice(index + 1, 0, newNode);
  }

  _insertNonFull(node, key, value) {
    let i = node.keys.length - 1;

    if (node.isLeaf) {
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      node.keys.splice(i + 1, 0, key);
      node.values.splice(i + 1, 0, value);
    } else {
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }
      i++;
      if (node.children[i].keys.length === 2 * this.minDegree - 1) {
        this.splitChild(node, i);
        if (key > node.keys[i]) {
          i++;
        }
      }
      this._insertNonFull(node.children[i], key, value);
    }
  }

  search(key) {
    return this._searchNode(this.root, key);
  }

  _searchNode(node, key) {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }
    if (i < node.keys.length && key === node.keys[i]) {
      return node.values[i];
    } else if (node.isLeaf) {
      return null;
    } else {
      return this._searchNode(node.children[i], key);
    }
  }
}

// Initialize B-Tree and insert entries
const bTree = new BTree(2);

jsonData.forEach(entry => {
  bTree.insert(entry.title, entry);
});

// Set up readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the title to search: ", (searchTitle) => {
  const startTime = Date.now(); // Start time before search
  const result = bTree.search(searchTitle);
  const endTime = Date.now(); // End time after search

  const elapsedTime = endTime - startTime; // Calculate elapsed time

  if (result) {
    console.log(`Found:`, result);
  } else {
    console.log("Title not found.");
  }

  console.log(`Search time: ${elapsedTime} ms`);

  rl.close();
});

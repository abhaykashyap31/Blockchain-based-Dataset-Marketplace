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
  
  // Data loading and search functionality
  async function loadData() {
    const response = await fetch('../articles.json'); // Replace with the actual path
    const jsonData = await response.json();
  
    // Initialize B-Trees for title and author
    const titleTree = new BTree(2);
    const authorTree = new BTree(2);
  
    // Insert entries by title and author into separate B-Trees
    jsonData.forEach(article => {
      titleTree.insert(article.title, article);
      authorTree.insert(article.author, article);
    });
  
    // Function to search by title
    function searchByTitle(title) {
      const result = titleTree.search(title);
      if (result) {
        console.log(`Found by Title:`, result);
      } else {
        console.log("Title not found.");
      }
    }
  
    // Function to search by author
    function searchByAuthor(author) {
      const result = authorTree.search(author);
      if (result) {
        console.log(`Found by Author:`, result);
      } else {
        console.log("Author not found.");
      }
    }
  
    // Search examples
    const searchTitle = prompt("Enter the title to search:"); // For browser environment
    searchByTitle(searchTitle);
  
    const searchAuthor = prompt("Enter the author to search:"); // For browser environment
    searchByAuthor(searchAuthor);
  }
  
  loadData();
  
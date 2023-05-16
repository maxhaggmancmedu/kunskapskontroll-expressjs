const keys = [
    '5', '10', '20', '40', '80', '160', '320'
]

function addKey(key) {
    if (keys.includes(key)) {
      return false; 
    }
  
    keys.push(key);
    return true; 
  }
  
  function getKeys() {
    return keys;
  }
  
  function deleteKey(key) {
    const index = keys.indexOf(key);
    if (index === -1) {
      return false;
    }
  
    keys.splice(index, 1);
    return true;
  }
  
  module.exports = {
    addKey,
    getKeys,
    deleteKey,
  };
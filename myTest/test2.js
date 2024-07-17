class ListNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inOrderTraversal(root) {
  let res = [];
  const inOrder = (root) => {
    if (!root) return;
    inOrder(root.left);
    res.push(root.val);
    inOrder(root.right);
  };
  inOrder(root);
  return res;
}

function customNew(constructor, ...args) {
  let obj = {};
  Object.setPrototypeOf(obj, constructor.prototype);
  let res = constructor.apply(obj, args);
  return res instanceof Object ? res : obj;
}

const flatArr = (arr) => {
  return arr.reduce((pre, item) => {
    return pre.concat(Array.isArray(item) ? flatArr(item) : item);
  }, []);
};

/**
 * [{
 * userId:12,
 * timeStanp:124234,
 * action:1/-1
 * }]
 */

// 输入：strs = ["flower","flow","flight"]
// 输出："fl"
const findCommon = (arr) => {
  let res = "";
  let firstStr = arr[0];
  for (let i = 0; i < firstStr.length; i++) {
    for (let j = 1; j < arr.length; j++) {
      if (arr[j][i] !== firstStr[i]) {
        return res;
      }
    }
    res += firstStr[i];
  }
  return res;
};

console.log(findCommon(["flower", "flow", "flight"]));

function myInterval(fn, time) {
  let timerId = null;
  let isClear = false;
  const interval = () => {
    if (isClear) {
      isClear = false;
      clearTimeout(timerId);
    } else {
      fn();
      timerId = setTimeout(interval, time);
    }
  };
  timerId = setTimeout(interval, time);

  return () => {
    isClear = true;
  };

}

// 无重复字符的最长子串  
let longestStr = (s) => {
  let len = s.length;
  if (len < 2) {
    return len;
  }

  let set = new Set();
  let left = 0;
  let right = 0;
  let maxLen = 0;
  while (right < len) {
    if (!set.has(s[right])) {
      set.add(s[right]);
      maxLen = Math.max(maxLen, set.size);
      right++;
    } else {
      while (set.has(s[right])) {
        set.delete(s[left]);
        left++;
      }
    }
  }
  return maxLen;
};
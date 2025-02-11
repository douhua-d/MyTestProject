// 26. 删除有序数组中的重复项  简单

/**
 * 给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。
 *
 * 考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：
 *
 * 更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要。
 * 返回 k 。
 * 判题标准:
 *
 * 系统会用下面的代码来测试你的题解:
 *
 * int[] nums = [...]; // 输入数组
 * int[] expectedNums = [...]; // 长度正确的期望答案
 *
 * int k = removeDuplicates(nums); // 调用
 *
 * assert k == expectedNums.length;
 * for (int i = 0; i < k; i++) {
 *     assert nums[i] == expectedNums[i];
 * }
 * 如果所有断言都通过，那么您的题解将被 通过。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,1,2]
 * 输出：2, nums = [1,2,_]
 * 解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素
 */

// var removeDuplicates = function (nums) {
//     if (nums.length === 0) return 0;

//     // 初始化指针 i
//     let i = 0;

//     // 遍历数组
//     for (let j = 1; j < nums.length; j++) {
//         // 如果当前元素和 i 位置的元素不同
//         if (nums[j] !== nums[i]) {
//             // i 指针向前移动一位
//             i++;
//             // 将当前元素的值赋给 i 位置
//             nums[i] = nums[j];
//         }
//     }

//     console.log(nums);

//     // 返回新数组的长度
//     return i + 1;
// };
// let nums = [1,1,2]
// console.log(removeDuplicates(nums));
// console.log(nums);


function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let i = 0; // 慢指针，用于跟踪不重复的元素

    for (let j = 1; j < nums.length; j++) { // 快指针，从第二个元素开始
        if (nums[j] !== nums[i]) { // 如果发现与上一个不相等的元素
            i++; // 先移动慢指针
            nums[i] = nums[j]; // 将当前不重复的元素放到正确位置
        }
    }

    return i + 1; // 返回数组中不重复元素的长度
}

// 测试
const nums = [1, 1, 2, 2, 3, 4, 4, 5];
const length = removeDuplicates(nums);
console.log('数组中不重复元素的长度:', length);
console.log('去重后的数组:', nums.slice(0, length));
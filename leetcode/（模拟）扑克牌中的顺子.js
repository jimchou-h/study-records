/**
 * 思路1：判断最大值和最小值相差有没有超过5以及有没有重复数字，没有的话肯定就是顺子了
 */
var isStraight = function(nums) {
		nums = nums.sort()
		let jokerNum = 0
		for (let i = 0; i <= 4; i++) {
			if (nums[i] == 0) {
				jokerNum++
			} else {
				if (nums[i] == nums[i + 1]) return false
			}

			return nums[4] - nums[jokerNum] > 0 && nums[4] - nums[jokerNum] < 5
		}

		/**
		 * 思路2：从高到低遍历，看能否组成顺子
		 * 不符合可以用大小王替换后再遍历
		 */
		var isStraight = function(nums) {
			nums = nums.sort((a, b) => a - b)
			let anyCount = 0
			if (nums[0] == 0) anyCount++
			if (nums[1] == 0) anyCount++

			let max = nums[4],
				isReplace = 0
			for (let i = 3; i >= 0; i--) {
				if (nums[i] === 0) break
				if (nums[i] != max - (4 - i) - isReplace) {
					if (isReplace < anyCount) {
						isReplace++
						i++
					} else {
						return false
					}
				}
			}
			return true
		};

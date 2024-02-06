/**
 * 假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
 * 给你一个整数数组  flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false。
 */

var canPlaceFlowers = function(flowerbed, n) {
	// 增加边界值
	flowerbed = [0, ...flowerbed, 0]
	let result = 0
	for (let i = 0, len = flowerbed.length; i < len; i++) {
		// 符合条件直接插花
		if (flowerbed[i - 1] === 0 && flowerbed[i] === 0 && flowerbed[i + 1] === 0) {
			flowerbed[i] = 1
			result++
		}
	}
	return result >= n
};

// ============================================================
// 成绩统计小工具
// 数据流程：原始数据 → 清洗 → 计算 → 格式化输出
// ============================================================

// ---------- 第一步：原始数据（含缺考、缺填、非法分数等脏数据）----------
const rawScores = [
    { name: '张三',   score: 88 },
    { name: '李四',   score: 92 },
    { name: '王五',   score: '缺考' },   // 非数字
    { name: '赵六',   score: 45 },
    { name: '钱七',   score: 77 },
    { name: '孙八',   score: '' },        // 缺填
    { name: '周九',   score: 105 },       // 超出上限
    { name: '吴十',   score: 60 },
    { name: '郑十一', score: -5 },        // 低于下限
    { name: '王十二', score: 59 }
];

console.log('【输入】原始数据：', rawScores);

// ---------- 第二步：数据清洗（只保留 0~100 的数字成绩，非法数据被过滤，程序不崩溃）----------
/**
 * 清洗成绩数据
 * @param {Array} list 原始成绩数组
 * @returns {Array} 只含合法成绩的新数组
 */
function cleanScores(list) {
    return list.filter(item => typeof item.score === 'number' && item.score >= 0 && item.score <= 100);
}

// ---------- 第三步：统计计算（reduce 求总分平均分，filter+map 求及格/不及格名单）----------
/**
 * 计算成绩统计结果
 * @param {Array} list 清洗后的成绩数组
 * @returns {Object} 人数、平均分、及格名单、不及格名单
 */
function calcStats(list) {
    const total = list.reduce((sum, item) => sum + item.score, 0);
    const average = list.length > 0 ? Math.round((total / list.length) * 100) / 100 : 0;
    const passed = list.filter(item => item.score >= 60).map(item => item.name);
    const failed = list.filter(item => item.score < 60).map(item => item.name);
    return { count: list.length, average, passed, failed };
}

// ---------- 第四步：格式化输出（把统计结果拼成可读的报告）----------
/**
 * 格式化并打印成绩统计报告
 * @param {Object} stats calcStats 返回的统计结果
 */
function printReport(stats) {
    console.log('【输出】====== 成绩统计报告 ======');
    console.log('有效成绩人数：' + stats.count + ' 人');
    console.log('平均分：' + stats.average + ' 分');
    console.log('及格名单（' + stats.passed.length + '人）：' + stats.passed.join('、'));
    console.log('不及格名单（' + stats.failed.length + '人）：' + stats.failed.join('、'));
}

// ---------- 主流程：原始数据 → 清洗 → 计算 → 格式化输出 ----------
const cleanData = cleanScores(rawScores);
console.log('【中间结果】清洗后数据：', cleanData);

const stats = calcStats(cleanData);
console.log('【中间结果】统计计算结果：', stats);

printReport(stats);

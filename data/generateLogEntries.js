/**
 * Script to generate realistic mock log entries for dashboard
 * Run: node generateLogEntries.js
 */

// Emotion categories with variations
const emotions = [
  // Lo âu
  "Lo âu nghiêm trọng",
  "Lo âu vừa phải",
  "Lo âu nhẹ",
  "Lo lắng tương lai",
  "Lo lắng học tập",
  
  // Stress/Áp lực
  "Áp lực thi cử",
  "Áp lực học tập",
  "Stress gia đình",
  "Stress bạn bè",
  "Áp lực kỳ vọng",
  
  // Kiệt sức
  "Kiệt sức học tập",
  "Kiệt sức tinh thần",
  "Kiệt sức công việc",
  "Mệt mỏi kéo dài",
  
  // Cảm xúc tiêu cực
  "Cô đơn, mất kết nối",
  "Cô đơn trong đám đông",
  "Buồn bã kéo dài",
  "Buồn chán, chán nản",
  "Tức giận, bực bội",
  "Thất vọng bản thân",
  
  // Vấn đề giấc ngủ
  "Mất ngủ triền miên",
  "Rối loạn giấc ngủ",
  "Ác mộng thường xuyên",
  
  // Tích cực/Nhẹ nhàng
  "Muốn được lắng nghe",
  "Cần chia sẻ tâm sự",
  "Tìm kiếm an ủi",
  "Mong muốn kết nối",
];

const statuses = ["Hoàn tất", "Đang hỗ trợ", "Chờ xử lý"];
const levels = ["Cao", "Trung bình", "Thấp"];

// Status distribution: Hoàn tất 60%, Đang hỗ trợ 25%, Chờ xử lý 15%
const statusWeights = [0.6, 0.25, 0.15];

// Level distribution: Trung bình 50%, Cao 30%, Thấp 20%
const levelWeights = [0.3, 0.5, 0.2];

function weightedRandom(items, weights) {
  const random = Math.random();
  let cumulative = 0;
  
  for (let i = 0; i < items.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) {
      return items[i];
    }
  }
  
  return items[items.length - 1];
}

function getRandomEmotion() {
  return emotions[Math.floor(Math.random() * emotions.length)];
}

function getRandomStatus() {
  return weightedRandom(statuses, statusWeights);
}

function getRandomLevel() {
  return weightedRandom(levels, levelWeights);
}

// Generate realistic timestamp within last 6 months
// Peak hours: 15h-22h, less on weekends
function getRandomTimestamp(index, total) {
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  // Distribute entries across 6 months
  const timeRange = now.getTime() - sixMonthsAgo.getTime();
  const baseTime = sixMonthsAgo.getTime() + (timeRange * index / total);
  
  const date = new Date(baseTime);
  
  // Adjust for realistic patterns
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Weekend: reduce by 30%
  if (isWeekend && Math.random() < 0.3) {
    date.setHours(date.getHours() + Math.floor(Math.random() * 24));
  }
  
  // Set realistic hour (peak 15h-22h)
  const hourWeights = [
    0.5, 0.3, 0.2, 0.2, 0.3, 0.5,  // 0-5h (night - low)
    0.8, 1.2, 1.5, 2.0, 2.5, 3.0,  // 6-11h (morning - increasing)
    3.2, 3.5, 4.0, 5.0, 5.5, 6.0,  // 12-17h (afternoon - peak)
    6.5, 7.0, 7.5, 8.0, 6.0, 3.0,  // 18-23h (evening - high peak, then drop)
  ];
  
  const randomHour = weightedRandom(
    Array.from({ length: 24 }, (_, i) => i),
    hourWeights
  );
  
  date.setHours(randomHour);
  date.setMinutes(Math.floor(Math.random() * 60));
  
  return date;
}

function formatTimestamp(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function generateLogEntries(count) {
  const entries = [];
  
  for (let i = 0; i < count; i++) {
    const id = `AN-${String(80000 - i).padStart(5, '0')}`;
    const timestamp = getRandomTimestamp(i, count);
    
    entries.push({
      id,
      emotion: getRandomEmotion(),
      status: getRandomStatus(),
      time: formatTimestamp(timestamp),
      level: getRandomLevel(),
    });
  }
  
  // Sort by timestamp descending (newest first)
  entries.sort((a, b) => {
    const dateA = new Date(a.time.split(' ')[0].split('/').reverse().join('-') + ' ' + a.time.split(' ')[1]);
    const dateB = new Date(b.time.split(' ')[0].split('/').reverse().join('-') + ' ' + b.time.split(' ')[1]);
    return dateB.getTime() - dateA.getTime();
  });
  
  return entries;
}

// Generate 1500 entries
console.log('🔄 Generating 1500 log entries...');
const logEntries = generateLogEntries(12847);

// Create TypeScript file content
const fileContent = `/**
 * Auto-generated mock log entries
 * Generated: ${new Date().toLocaleString('vi-VN')}
 * Total entries: ${logEntries.length}
 */

export interface LogEntry {
  id: string;
  emotion: string;
  status: string;
  time: string;
  level: string;
}

export const mockLogEntries: LogEntry[] = ${JSON.stringify(logEntries, null, 2)};

// Statistics
export const logStats = {
  total: ${logEntries.length},
  byStatus: {
    "Hoàn tất": ${logEntries.filter(e => e.status === "Hoàn tất").length},
    "Đang hỗ trợ": ${logEntries.filter(e => e.status === "Đang hỗ trợ").length},
    "Chờ xử lý": ${logEntries.filter(e => e.status === "Chờ xử lý").length},
  },
  byLevel: {
    "Cao": ${logEntries.filter(e => e.level === "Cao").length},
    "Trung bình": ${logEntries.filter(e => e.level === "Trung bình").length},
    "Thấp": ${logEntries.filter(e => e.level === "Thấp").length},
  },
};
`;

// Write to file
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'data', 'mockLogEntries.ts');
const outputDir = path.dirname(outputPath);

// Create data directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, fileContent, 'utf-8');

console.log('✅ Successfully generated log entries!');
console.log(`📁 File: ${outputPath}`);
console.log(`📊 Total entries: ${logEntries.length}`);
console.log('\n📈 Distribution:');
console.log(`   Hoàn tất: ${logEntries.filter(e => e.status === "Hoàn tất").length} (${(logEntries.filter(e => e.status === "Hoàn tất").length / logEntries.length * 100).toFixed(1)}%)`);
console.log(`   Đang hỗ trợ: ${logEntries.filter(e => e.status === "Đang hỗ trợ").length} (${(logEntries.filter(e => e.status === "Đang hỗ trợ").length / logEntries.length * 100).toFixed(1)}%)`);
console.log(`   Chờ xử lý: ${logEntries.filter(e => e.status === "Chờ xử lý").length} (${(logEntries.filter(e => e.status === "Chờ xử lý").length / logEntries.length * 100).toFixed(1)}%)`);
console.log('\n💡 Import in your component:');
console.log('   import { mockLogEntries } from "@/data/mockLogEntries";');

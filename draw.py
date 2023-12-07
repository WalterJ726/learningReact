import matplotlib.pyplot as plt
import pandas as pd
import re

# 读取日志文件
def read_log_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
    return lines

# 解析日志
def parse_log(lines):
    bypass_data = []
    lane_change_data = {}
    for line in lines:
        timestamp, _, _, meta = re.findall(r'\[(.*?)\]', line)[:4]
        type, title, value = re.findall(r'type:(.*?), title:(.*?), value:(.*)', meta)[0]

        if title == 'bypass':
            bypass_data.append((timestamp, value))
        elif title == 'lane_change':
            values = value.split(',')
            for v in values:
                curve, val = v.split(':')
                if curve not in lane_change_data:
                    lane_change_data[curve] = []
                lane_change_data[curve].append((timestamp, float(val)))
    return bypass_data, lane_change_data

# 绘制柱状图
def plot_bypass(bypass_data):
    df = pd.DataFrame(bypass_data, columns=['Timestamp', 'Value'])
    df['Label'] = df['Timestamp'] + ': ' + df['Value']
    df.plot(kind='bar', x='Timestamp', y='Value')
    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.title('Bypass Chart')
    plt.show()

# 绘制折线图
def plot_lane_change(lane_change_data):
    for curve, data in lane_change_data.items():
        df = pd.DataFrame(data, columns=['Timestamp', curve])
        df.plot(x='Timestamp', y=curve)
    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.title('Lane Change Chart')
    plt.show()

# 主函数
def main():
    log_file_path = 'your_log_file.txt'  # 替换为您的日志文件路径
    lines = read_log_file(log_file_path)
    bypass_data, lane_change_data = parse_log(lines)
    plot_bypass(bypass_data)
    plot_lane_change(lane_change_data)

if __name__ == "__main__":
    main()

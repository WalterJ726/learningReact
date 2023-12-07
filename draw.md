```python

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
```



### 第二个图
```python
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
    for line in lines:
        timestamp, _, _, meta = re.findall(r'\[(.*?)\]', line)[:4]
        type, title, value = re.findall(r'type:(.*?), title:(.*?), value:(.*)', meta)[0]

        if title == 'bypass':
            bypass_data.append((timestamp, value))
    return bypass_data

# 绘制stem图
def plot_bypass(bypass_data):
    df = pd.DataFrame(bypass_data, columns=['Timestamp', 'Value'])
    df['Value'] = pd.to_numeric(df['Value'])
    markers, stems, baseline = plt.stem(df['Timestamp'], df['Value'])
    plt.setp(baseline, color='r', linewidth=2)

    # 在每个点上添加标签
    for i in range(len(df)):
        plt.text(df['Timestamp'][i], df['Value'][i], f"{df['Timestamp'][i]}: {df['Value'][i]}", 
                 verticalalignment='bottom', horizontalalignment='right', fontsize=8)

    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.title('Bypass Chart')
    plt.xticks(rotation=45)
    plt.show()

# 主函数
def main():
    log_file_path = 'your_log_file.txt'  # 替换为您的日志文件路径
    lines = read_log_file(log_file_path)
    bypass_data = parse_log(lines)
    plot_bypass(bypass_data)

if __name__ == "__main__":
    main()

```

## 组装散点图
```python
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
    for line in lines:
        timestamp, _, _, meta = re.findall(r'\[(.*?)\]', line)[:4]
        type, title, value = re.findall(r'type:(.*?), title:(.*?), value:(.*)', meta)[0]

        if title == 'bypass':
            bypass_data.append((timestamp, value))
    return bypass_data

# 绘制散点图和竖线
def plot_bypass(bypass_data):
    df = pd.DataFrame(bypass_data, columns=['Timestamp', 'Value'])
    df['Value'] = pd.to_numeric(df['Value'])

    # 绘制散点图
    plt.scatter(df['Timestamp'], df['Value'])

    # 在每个事件的时间戳位置画竖线
    for timestamp in df['Timestamp']:
        plt.axvline(x=timestamp, color='grey', linestyle='--', alpha=0.5)

    # 在每个点上添加标签
    for i, row in df.iterrows():
        plt.text(row['Timestamp'], row['Value'], f"{row['Timestamp']}: {row['Value']}", 
                 ha='right', va='bottom', fontsize=8)

    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.title('Bypass Events')
    plt.xticks(rotation=45)
    plt.show()

# 主函数
def main():
    log_file_path = 'your_log_file.txt'  # 替换为您的日志文件路径
    lines = read_log_file(log_file_path)
    bypass_data = parse_log(lines)
    plot_bypass(bypass_data)

if __name__ == "__main__":
    main()

```

## 换成实线
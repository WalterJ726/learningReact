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

# 绘制散点图和连接线
def plot_bypass(bypass_data):
    df = pd.DataFrame(bypass_data, columns=['Timestamp', 'Value'])
    df['Value'] = pd.to_numeric(df['Value'])

    # 绘制散点图
    plt.scatter(df['Timestamp'], df['Value'])

    # 从每个点到x轴画线
    for _, row in df.iterrows():
        plt.plot([row['Timestamp'], row['Timestamp']], [0, row['Value']], 'k-')

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
### 画多曲线在同一个图中
```python
import matplotlib.pyplot as plt
import pandas as pd
import re

# 其他函数保持不变...

# 绘制折线图，将所有曲线添加到同一个图表中
def plot_lane_change(lane_change_data):
    plt.figure(figsize=(10, 6))  # 可以调整图表的大小

    for curve, data in lane_change_data.items():
        df = pd.DataFrame(data, columns=['Timestamp', curve])
        plt.plot(df['Timestamp'], df[curve], label=curve)  # 添加曲线到图表

    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.title('Lane Change Chart')
    plt.legend()  # 显示图例
    plt.xticks(rotation=45)
    plt.show()

# 主函数保持不变...

```

### 添加时间戳到下方
```python
import matplotlib.pyplot as plt
import pandas as pd
import re

# 其他函数保持不变...

# 绘制散点图和连接线
def plot_bypass(bypass_data):
    df = pd.DataFrame(bypass_data, columns=['Timestamp', 'Value'])
    df['Value'] = pd.to_numeric(df['Value'])

    plt.scatter(df['Timestamp'], df['Value'])

    # 从每个点到x轴画浅蓝色线
    for _, row in df.iterrows():
        plt.plot([row['Timestamp'], row['Timestamp']], [0, row['Value']], 'c-')  # 浅蓝色线条

    # 在x轴下方添加时间戳标签
    for i, row in df.iterrows():
        plt.text(i, 0, row['Timestamp'], ha='center', va='top', fontsize=8, rotation=45)

    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.title('Bypass Events')
    plt.xticks(rotation=45)  # 根据需要调整x轴刻度的旋转角度
    plt.show()

# 主函数保持不变...


```


## 画成上升沿的图
```python
def plot_bypass(bypass_data):
    df = pd.DataFrame(bypass_data, columns=['Timestamp', 'Value'])

    plt.plot(df['Timestamp'], df['Value'])


    # 在x轴下方添加时间戳标签
    for i, row in df.iterrows():
        plt.text(i, 0, row['Timestamp'], ha='center', va='top', fontsize=8, rotation=45)

    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.title('Bypass Events')
    plt.xticks(rotation=45)  # 根据需要调整x轴刻度的旋转角度
    plt.show()

这个bypass_data是有时间戳的，然后里面的value都是1，我希望你帮我想一个办法可以完美的画出阶跃上升沿的图出来。我的想法是改造一下这个bypass_data，根据时间戳采样一些新的数据，这样在原来有值的地方，还是保持原来的值，没有值的地方就变成0。
```
### 新的采样函数
```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def generate_time_series(bypass_data, interval=1.0):
    # 提取时间戳并排序
    timestamps = [ts for ts, _ in bypass_data]
    timestamps.sort()

    # 生成完整的时间序列
    start, end = timestamps[0], timestamps[-1]
    full_timestamps = np.arange(start, end, interval)

    return full_timestamps

def plot_bypass(bypass_data):
    # 生成时间序列
    full_timestamps = generate_time_series(bypass_data)

    # 转换为DataFrame并填充数据
    df = pd.DataFrame(bypass_data, columns=['Timestamp', 'Value'])
    df.set_index('Timestamp', inplace=True)
    df = df.reindex(full_timestamps, fill_value=0).reset_index()
    df.rename(columns={'index': 'Timestamp'}, inplace=True)

    # 绘制阶跃图
    plt.step(df['Timestamp'], df['Value'], where='post')

    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.title('Bypass Events')
    plt.show()

# 示例数据和主函数...

```

### 时间序列的提取
```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def extract_data(bypass_data):
    # 提取时间戳和值
    extracted_data = [(item[1], item[2]) for item in bypass_data]
    return extracted_data

def generate_time_series(extracted_data, interval=1.0):
    # 提取时间戳并排序
    timestamps = [ts for ts, _ in extracted_data]
    timestamps.sort()

    # 生成完整的时间序列
    start, end = timestamps[0], timestamps[-1]
    full_timestamps = np.arange(start, end, interval)

    return full_timestamps

def plot_bypass(bypass_data):
    # 提取时间戳和值
    extracted_data = extract_data(bypass_data)

    # 生成时间序列
    full_timestamps = generate_time_series(extracted_data)

    # 转换为DataFrame并填充数据
    df = pd.DataFrame(extracted_data, columns=['Timestamp', 'Value'])
    df.set_index('Timestamp', inplace=True)
    df = df.reindex(full_timestamps, fill_value=0).reset_index()
    df.rename(columns={'index': 'Timestamp'}, inplace=True)

    # 绘制阶跃图
    plt.step(df['Timestamp'], df['Value'], where='post')

    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.title('Bypass Events')
    plt.show()

# 示例数据和主函数...


```
### 新的采样方式
```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import re
from datetime import datetime, timedelta

# 假设的时间戳格式为 '%Y-%m-%d %H:%M:%S'，需要根据实际情况调整

def generate_time_series(bypass_data, freq='T'):
    # 转换时间戳并排序
    timestamps = [datetime.strptime(ts, '%Y-%m-%d %H:%M:%S') for ts, _ in bypass_data]
    timestamps.sort()

    # 生成完整的时间序列
    start, end = timestamps[0], timestamps[-1]
    full_timestamps = pd.date_range(start=start, end=end, freq=freq)

    return full_timestamps

def plot_bypass(bypass_data):
    # 生成时间序列
    full_timestamps = generate_time_series(bypass_data)

    # 转换为DataFrame并填充数据
    df = pd.DataFrame(bypass_data, columns=['Timestamp', 'Value'])
    df.set_index('Timestamp', inplace=True)
    df.index = pd.to_datetime(df.index)
    df = df.reindex(full_timestamps, fill_value=0).reset_index()
    df.rename(columns={'index': 'Timestamp'}, inplace=True)

    # 绘制阶跃图
    plt.step(df['Timestamp'], df['Value'], where='post')

    # 在x轴下方添加时间戳标签
    for i, row in df.iterrows():
        plt.text(row['Timestamp'], 0, row['Timestamp'].strftime('%Y-%m-%d %H:%M:%S'), 
                 ha='center', va='top', fontsize=8, rotation=45)

    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.title('Bypass Events')
    plt.xticks(rotation=45)
    plt.show()

# 假设的数据和主函数...

这个bypass_data是一个list，里面的每一个元素为[“字符串1", double的时间序列,1, "用户字符串"]，这里面的数据有点奇怪，就是这里的时间序列都是分散地集中的，比如说有一部分是集中在一起，然后要加上很大的一个数值才会到下一堆时间序列。比如说，时间是[("112233", 3885.264, 1, "2244"),("112233", 3885.365, 1, "2244"),("112233", 3908.560, 1, "2244"),("112233", 3908.674, 1, "2244"),("112233", 3908.782, 1, "2244")]我希望你帮我想一个办法可以完美的画出阶跃上升沿的图出来。我的想法是改造一下这个bypass_data，根据时间戳采样一些新的数据，这样在原来有值的地方，还是保持原来的值，没有值的地方就变成0。
```


### 新的画图函数
```python
def plot_bypass_with_float_timestamps_using_plot(bypass_data, freq='T'):
    """
    Plot the line chart for the bypass data using float timestamps.
    """
    # Create DataFrame from the bypass data
    df = pd.DataFrame(bypass_data, columns=['String1', 'Timestamp', 'Value', 'UserString'])

    # Generate a full range of timestamps
    min_timestamp = df['Timestamp'].min()
    max_timestamp = df['Timestamp'].max()
    # Calculate the number of steps based on frequency (assuming freq='T' is for minutes)
    num_steps = int((max_timestamp - min_timestamp) * 60)  # 60 steps per unit if freq is 'T'
    full_timestamps = np.linspace(min_timestamp, max_timestamp, num_steps)

    # Reindex the DataFrame to the full range, filling missing values with 0
    df.set_index('Timestamp', inplace=True)
    df = df.reindex(full_timestamps, fill_value=0).reset_index()
    df.rename(columns={'index': 'Timestamp'}, inplace=True)

    # Plot the line chart
    plt.figure(figsize=(15, 5))
    plt.plot(df['Timestamp'], df['Value'])
    plt.xlabel('Timestamp (as float)')
    plt.ylabel('Value')
    plt.title('Bypass Events with Float Timestamps (Line Plot)')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

# Using the original bypass data
plot_bypass_with_float_timestamps_using_plot(bypass_data)

```
#include <iostream>
#include <fstream>
using namespace std;

// Struct lưu trữ thông tin về đoạn thẳng, bao gồm điểm bắt đầu và kết thúc
struct Line {
    int start, end;
};

// Hàm so sánh để sắp xếp các đoạn thẳng theo thứ tự tăng dần của điểm kết thúc
int compareLine(const void* a, const void* b) {
    Line* lineA = (Line*) a;
    Line* lineB = (Line*) b;
    return lineA->end - lineB->end;
}

int main() {
    int n;
    ifstream inFile("line1.txt");
    if (inFile.is_open()) {
        // Đọc số lượng đoạn thẳng từ file
        inFile >> n;

        // Khởi tạo mảng lưu trữ các đoạn thẳng
        Line* lines = new Line[n];

        // Nhập vào thông tin cho các đoạn thẳng
        for (int i = 0; i < n; i++) {
            inFile >> lines[i].start >> lines[i].end;
        }
        inFile.close();

        // Sắp xếp các đoạn thẳng theo thứ tự tăng dần của điểm kết thúc bằng thuật toán quick sort
        qsort(lines, n, sizeof(Line), compareLine);

        // Khởi tạo tập hợp kết quả và đoạn thẳng đầu tiên được chọn
        Line* result = new Line[n];
        result[0] = lines[0];
        int count = 1;

        // Lặp qua từng đoạn thẳng để tìm đoạn thẳng không giao với các đoạn thẳng đã được chọn
        for (int i = 1; i < n; i++) {
            // Nếu đoạn thẳng này không giao với bất kỳ đoạn thẳng nào trong tập hợp kết quả, thì chọn đoạn thẳng này và đưa vào tập hợp kết quả
            if (lines[i].start >= result[count - 1].end) {
                result[count] = lines[i];
                count++;
            }
        }

        // In ra số lượng đoạn thẳng được chọn và thông tin về các đoạn thẳng này
        cout << count << endl;
        for (int i = 0; i < count; i++) {
            cout << result[i].start << " " << result[i].end << endl;
        }

        // Giải phóng bộ nhớ sau khi sử dụng xong
   delete[] lines;
        delete[] result;
    }

    return 0;
}

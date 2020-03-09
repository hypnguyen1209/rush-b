# rush-b
Chức năng chính là con bot này đó là gửi tin nhắn tới thông báo thành viên mới, thành viên rời đi và lấy những tin tức liên quan đến công nghệ và đời sống....
## Setup
Cài đặt các thư viện cần thiết, xem thêm cách cài `pip` tại [đây](https://docs.python.org/3/installing/index.html):
> pip3 -r requirement.txt
<br>
Truy cập https://discordapp.com/developers/applications để tạo Applications mới với tên bất kì nào cũng được, nó sẽ được hiển thị khi App của bạn kết nối OAuth2 đến discord của người khác
<br>
Chọn Add Bot để tạo con bot mới:
<br>
![](https://i.imgur.com/LVpD6IJ.png)
<br>
Nhấn `Copy` để lấy Token của bot, Token này sẽ được reset khi bot ở chế độ `Invisible` quá lâu và `PUBLIC BOT`
<br>
Tiếp theo nữa ta cần lấy ID của channel mà chúng ta muốn con bot đưa tin về công nghệ, đầu tiên hãy bật chế độ Developer Mode trong Settings
<br>
![](https://i.imgur.com/Z8I6PNG.png)
<br>
Nhấn `Copy ID` lấy ID của channel:
<br>
![](https://i.imgur.com/SZiXiyC.png)
<br>
Có ID vào Token ta thay thế vào file `main.py` và chạy nó.
## Setup API tin tức
Bước này thì có vẻ ko cần thiết lắm vẫn sẽ có người cần:
<br>
Chậy lần lượt 2 lệnh sau trên Terminal:

> npm i

Đợi các bước tải modules hoàn thành chạy tiếp:

> npm start

Xong! 😁😁

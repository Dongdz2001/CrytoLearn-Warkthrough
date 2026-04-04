# Chương III: Thực nghiệm

## 3.1. Mục tiêu thực nghiệm

Trong chương này, ta trình bày quá trình thực nghiệm của hệ thống **CryptoLearn** với trọng tâm là đánh giá cách hệ thống xử lý, lưu trữ và bảo vệ dữ liệu học tập của người dùng trong quá trình luyện tập. Đối với một nền tảng học mật mã, việc mô phỏng thuật toán trên giao diện là cần thiết, nhưng chưa đủ. Giá trị thực tiễn của đề tài chỉ thật sự được thể hiện khi các nguyên lý mật mã được đưa vào chính hoạt động của hệ thống, đặc biệt là trong bài toán bảo vệ dữ liệu người dùng.

Với định hướng đó, nội dung thực nghiệm không chỉ dừng ở việc kiểm tra giao diện, điều hướng hay độ chính xác của các công cụ học tập, mà tập trung làm rõ một câu hỏi cốt lõi: **dữ liệu lịch sử luyện tập của người dùng được mã hóa như thế nào trước khi lưu vào cơ sở dữ liệu, và việc mã hóa đó có ý nghĩa gì trong toàn bộ hệ thống**.

Ta lựa chọn vấn đề này làm trung tâm của chương thực nghiệm vì dữ liệu lịch sử học tập không chỉ là dữ liệu kỹ thuật đơn thuần. Đó là dữ liệu phản ánh mức độ tiếp thu kiến thức, hiệu quả luyện tập, năng lực hiện thời và tiến trình học của mỗi cá nhân. Nếu một hệ thống dạy mật mã nhưng lại lưu toàn bộ lịch sử học tập ở dạng dễ đọc, thì chính hệ thống đó chưa vận dụng đúng tinh thần bảo vệ thông tin mà nó đang truyền đạt. Do đó, việc đưa cơ chế mã hóa vào dữ liệu lưu trữ không chỉ mang ý nghĩa kỹ thuật, mà còn thể hiện tính nhất quán về mặt học thuật của đề tài.

---

## 3.2. Môi trường thực nghiệm

Hệ thống **CryptoLearn** được xây dựng trên nền tảng **React** kết hợp với **Vite**, sử dụng **Firebase Authentication** để xác thực người dùng và **Cloud Firestore** để lưu trữ dữ liệu học tập. Bên cạnh đó, thư viện **Crypto-JS** được sử dụng để triển khai các thao tác mã hóa và giải mã dữ liệu trước khi ghi vào cơ sở dữ liệu.

Trong quá trình thực nghiệm, ta quan tâm đến các thành phần kỹ thuật chính sau:

- `firebase.js`: khởi tạo kết nối Firebase, xác thực và Firestore.
- `AuthContext.jsx`: quản lý thông tin người dùng đăng nhập.
- `GamePage.jsx`: xử lý quá trình luyện tập, chấm điểm và tạo dữ liệu kết quả.
- `dbService.js`: thực hiện các thao tác đọc/ghi dữ liệu học tập.
- `cryptoUtils.js`: triển khai mã hóa và giải mã dữ liệu lưu trữ.
- `ProfilePage.jsx`: hiển thị thống kê và lịch sử học tập sau khi giải mã.

Môi trường chạy thử gồm hệ điều hành Windows, trình duyệt Chrome hoặc Edge và chế độ phát triển `npm run dev`. Trên môi trường này, toàn bộ quá trình đăng nhập, luyện tập, lưu dữ liệu, truy xuất dữ liệu và giải mã đều được thực hiện liên tục để quan sát đầy đủ vòng đời của dữ liệu học tập trong hệ thống.

---

## 3.3. Đối tượng thực nghiệm

Đối tượng thực nghiệm của chương này là **dữ liệu học tập của người dùng khi luyện tập**, đặc biệt là dữ liệu được phát sinh trong quá trình chơi quiz và được lưu xuống Firestore.

Dữ liệu đó bao gồm hai lớp chính.

Lớp thứ nhất là **thống kê học tập tổng hợp**, phản ánh mức độ tham gia và kết quả tích lũy của người dùng, gồm tổng điểm và tổng số câu hỏi đã hoàn thành.

Lớp thứ hai là **dữ liệu lịch sử luyện tập chi tiết**, được tạo ra sau mỗi vòng chơi. Mỗi vòng luyện tập ghi nhận:

- mức độ câu hỏi được chọn;
- số câu trả lời đúng;
- tổng số câu hỏi trong vòng;
- thời điểm hoàn thành;
- danh sách các câu hỏi đã trả lời, đáp án người dùng chọn, đáp án đúng và trạng thái đúng hoặc sai.

Về mặt nghiệp vụ, lớp dữ liệu thứ hai là dữ liệu giàu ý nghĩa nhất, bởi nó mô tả trực tiếp quá trình học tập của người dùng. Ta không chỉ biết người dùng đạt bao nhiêu điểm, mà còn biết họ thường sai ở câu hỏi nào, mạnh ở nhóm kiến thức nào, và tiến bộ ra sao qua từng lần luyện tập. Chính vì mang nội dung học tập cá nhân sâu như vậy, dữ liệu này cần được bảo vệ chặt chẽ hơn khi lưu trữ.

---

## 3.4. Nội dung thực nghiệm

### 3.4.1. Luồng sinh dữ liệu học tập trong quá trình luyện tập

Phần thực nghiệm bắt đầu từ chính luồng sử dụng của người học. Sau khi đăng nhập, người dùng truy cập trang trò chơi và lựa chọn một mức độ luyện tập. Hệ thống lấy các câu hỏi phù hợp từ tập dữ liệu `quiz.js`, xáo trộn thứ tự đáp án và lần lượt hiển thị cho người dùng. Trong suốt quá trình này, mỗi thao tác chọn đáp án đều được ghi nhận vào trạng thái của ứng dụng.

Khi người dùng hoàn thành một vòng luyện tập, `GamePage.jsx` tổng hợp toàn bộ kết quả thành một đối tượng dữ liệu. Đối tượng này gồm mức độ vòng chơi, số câu đúng, tổng số câu hỏi, lịch sử chi tiết từng câu trả lời và thời điểm kết thúc vòng chơi. Đây là thời điểm rất quan trọng của luồng thực nghiệm, bởi từ đây dữ liệu không còn là kết quả tạm thời trên giao diện nữa, mà trở thành dữ liệu chuẩn bị được lưu trữ trong cơ sở dữ liệu.

Nếu người dùng đã đăng nhập, hệ thống gọi `saveGameRound()` để lưu dữ liệu của vòng chơi và `saveUserStats()` để cập nhật thống kê tích lũy. Cả hai thao tác này đều đi qua một lớp xử lý mã hóa trước khi chạm tới Firestore.

---

### 3.4.2. Thuật toán mã hóa được sử dụng

Ta sử dụng **AES** để mã hóa dữ liệu lưu trữ trong cơ sở dữ liệu. Cụ thể hơn, mã nguồn trong `cryptoUtils.js` cho thấy dữ liệu được mã hóa bằng:

- **AES**
- ở **chế độ CBC**
- kết hợp với **PKCS7 padding**

Đồng thời, trước khi thực hiện mã hóa, khóa bí mật đầu vào không được dùng trực tiếp mà được dẫn xuất thông qua **SHA-256**. Việc này giúp chuẩn hóa khóa trước khi sử dụng trong thuật toán AES.

Điểm rất quan trọng trong phần thực nghiệm là: **mỗi lần mã hóa một bản ghi dữ liệu, hệ thống sinh ra một IV ngẫu nhiên 128-bit mới**. Điều đó có nghĩa là ngay cả khi hai vòng luyện tập có cấu trúc dữ liệu gần giống nhau, ciphertext tạo ra vẫn khác nhau do khác IV.

Từ mã nguồn hiện tại, ta có thể mô tả đầy đủ cơ chế đang được áp dụng như sau:

- bí mật gốc được lấy từ biến môi trường;
- bí mật này được băm SHA-256 để tạo khóa cho AES;
- hệ thống sinh một IV ngẫu nhiên cho mỗi lần mã hóa;
- dữ liệu JSON được mã hóa bằng AES-CBC;
- kết quả được lưu theo định dạng: `iv_hex:ciphertext_base64`.

Cách triển khai này cho thấy hệ thống không chỉ áp dụng một phép mã hóa mang tính tượng trưng, mà đã xây dựng một quy trình mã hóa dữ liệu có cấu trúc và có thể giải thích rõ ràng về mặt kỹ thuật.

---

### 3.4.3. Mã hóa dữ liệu cơ sở dữ liệu để làm gì

Trong hệ thống này, việc mã hóa dữ liệu không nhằm che giấu toàn bộ hoạt động của hệ thống, mà nhằm bảo vệ **phần dữ liệu học tập mang tính cá nhân** của người dùng khi lưu vào Firestore.

Ta nhấn mạnh nội dung này vì đây là điểm có ý nghĩa nhất của phần thực nghiệm. Dữ liệu lịch sử luyện tập không đơn thuần là một bản ghi kỹ thuật. Nó chứa đựng các thông tin như:

- người dùng làm đúng bao nhiêu câu,
- người dùng sai ở câu hỏi nào,
- người dùng chọn đáp án gì,
- người dùng đang yếu ở nhóm kiến thức nào,
- người dùng luyện tập ở mức độ nào và vào thời điểm nào.

Nếu những dữ liệu này được lưu thẳng ở dạng rõ trong cơ sở dữ liệu, bất kỳ ai có khả năng truy cập dữ liệu lưu trữ cũng có thể đọc trực tiếp quá trình học tập của người dùng. Như vậy, ngay chính hệ thống học mật mã sẽ bộc lộ một điểm yếu trong việc bảo vệ dữ liệu mà nó đang giảng dạy.

Do đó, ta đưa AES vào để giải quyết đúng bài toán này: **bảo vệ lịch sử học tập và thống kê học tập khỏi việc bị lưu thuần túy dưới dạng rõ**.

Việc mã hóa trong hệ thống có ba ý nghĩa chính.

Thứ nhất, nó bảo vệ lớp dữ liệu chi tiết nhất của quá trình học tập. Cụ thể, trường `history` trong từng vòng chơi chứa toàn bộ lịch sử câu trả lời của người dùng. Đây là phần dữ liệu nhạy cảm nhất và cũng là phần được đặt bên trong payload mã hóa.

Thứ hai, nó giúp thống kê học tập tổng hợp của người dùng không bị lộ trực tiếp khi lưu trữ. Tổng điểm và tổng số câu hỏi đã làm là những dữ liệu có thể phản ánh hiệu suất học tập, nên cũng được đặt vào trường mã hóa trong document của người dùng.

Thứ ba, nó thể hiện tính ứng dụng của mật mã trong chính hệ thống. Thuật toán mã hóa không chỉ tồn tại ở phần bài học, mà trở thành một thành phần thực sự của kiến trúc phần mềm.

---

### 3.4.4. Cách dữ liệu được mã hóa trước khi lưu vào Firestore

Khi một đối tượng dữ liệu học tập được tạo ra, ví dụ như dữ liệu của một vòng chơi, hệ thống không ghi ngay object đó xuống Firestore. Trước hết, dữ liệu được chuyển thành chuỗi JSON. Chuỗi JSON này sau đó đi vào hàm `encryptData()`.

Tại đây, quá trình mã hóa được thực hiện theo các bước:

1. Hệ thống lấy bí mật gốc từ `VITE_ENCRYPTION_SECRET_KEY`.
2. Hệ thống băm bí mật gốc bằng SHA-256 để tạo khóa cho AES.
3. Hệ thống sinh một IV ngẫu nhiên dài 16 byte.
4. Hệ thống dùng AES-CBC với khóa đã dẫn xuất và IV vừa sinh để mã hóa chuỗi JSON.
5. Kết quả ciphertext được ghép với IV theo định dạng `iv_hex:ciphertext_base64`.
6. Chuỗi này được lưu vào trường `data` trong Firestore.

Nhờ đó, phần dữ liệu nghiệp vụ chi tiết không nằm ở dạng dễ đọc trong cơ sở dữ liệu. Khi xem document trên Firestore, người ta không thể thấy trực tiếp lịch sử câu hỏi, đáp án chọn hay trạng thái đúng sai của người dùng từ trường `data`.

Đây là một điểm rất quan trọng của phần thực nghiệm, vì nó cho thấy việc mã hóa không chỉ mang tính khái niệm mà đã được gắn vào đúng vị trí cần thiết nhất trong luồng dữ liệu.

---

### 3.4.5. Dữ liệu nào được mã hóa và dữ liệu nào chưa mã hóa

Trong quá trình thực nghiệm, ta nhận thấy hệ thống áp dụng cách tiếp cận có chọn lọc. Không phải toàn bộ document Firestore đều được mã hóa, mà hệ thống mã hóa phần dữ liệu chi tiết nhất.

Cụ thể, các nội dung được mã hóa gồm:

- thống kê người dùng trong trường `data` của document `users/{uid}`;
- nội dung đầy đủ của một vòng chơi trong trường `data` của collection `users/{uid}/rounds`;
- phần lịch sử chi tiết từng câu hỏi nằm trong chính payload của `roundData`.

Trong khi đó, một số metadata vẫn được lưu rõ như:

- `timestamp`,
- `level`,
- `score`.

Ta chấp nhận cách tổ chức này vì các trường trên phục vụ trực tiếp cho truy vấn và sắp xếp. Chẳng hạn, muốn lấy 20 vòng chơi gần nhất, hệ thống cần sắp xếp theo `timestamp`. Muốn hiển thị sơ bộ lịch sử chơi, hệ thống cần biết ngay `level` và `score` mà chưa nhất thiết phải giải mã toàn bộ nội dung.

Như vậy, phần thực nghiệm cho thấy hệ thống đang theo hướng **mã hóa dữ liệu học tập chi tiết, nhưng vẫn giữ lại metadata vận hành ở dạng rõ để đảm bảo hiệu quả truy vấn**. Đây là lựa chọn phù hợp trong khuôn khổ hiện tại của đề tài.

---

### 3.4.6. Cách dữ liệu được giải mã khi hiển thị lại cho người dùng

Sau khi dữ liệu đã được lưu vào Firestore, giá trị của cơ chế mã hóa chỉ được chứng minh đầy đủ khi hệ thống có thể giải mã và sử dụng lại dữ liệu một cách chính xác. Đây là nội dung tiếp theo của phần thực nghiệm.

Khi người dùng truy cập trang hồ sơ, `ProfilePage.jsx` gọi các hàm như `getUserStats()` và `getRoundHistory()`. Tại đây, trường `data` được tải về từ Firestore, sau đó hệ thống:

- tách phần IV và ciphertext từ chuỗi đã lưu,
- khôi phục IV từ dạng hex,
- sử dụng cùng khóa AES đã dẫn xuất bằng SHA-256,
- giải mã ciphertext bằng AES-CBC,
- thu lại chuỗi JSON gốc,
- parse chuỗi JSON thành object JavaScript.

Kết quả là dữ liệu học tập được tái tạo đầy đủ và hiển thị lên giao diện hồ sơ. Người dùng nhìn thấy tổng điểm, số câu đã giải, tỷ lệ chính xác và lịch sử các vòng chơi đã hoàn thành. Từ góc nhìn thực nghiệm, đây là bằng chứng cho thấy cơ chế mã hóa không làm mất dữ liệu, không làm sai dữ liệu và có thể tích hợp trọn vẹn vào vòng đời dữ liệu của hệ thống.

---

## 3.5. Đánh giá thực nghiệm đối với cơ chế mã hóa dữ liệu

Qua quá trình thực nghiệm, ta có thể đưa ra một số đánh giá quan trọng.

Trước hết, hệ thống đã triển khai thành công việc mã hóa dữ liệu học tập bằng AES trước khi lưu vào Firestore. Điều này chứng minh rằng đề tài không chỉ trình bày kiến thức mật mã theo hướng lý thuyết, mà còn sử dụng chính mật mã như một công cụ bảo vệ dữ liệu của ứng dụng.

Tiếp theo, cơ chế mã hóa hiện tại có điểm mạnh rõ rệt ở chỗ:

- dùng AES là thuật toán mã hóa đối xứng phổ biến và có tính ứng dụng cao;
- sử dụng chế độ CBC rõ ràng trong mã nguồn;
- sinh IV ngẫu nhiên cho từng bản ghi;
- tách riêng phần dữ liệu nhạy cảm vào trường mã hóa;
- vẫn cho phép hệ thống truy vấn và hiển thị dữ liệu hiệu quả.

Đặc biệt, đối với một hệ thống học tập, phần dữ liệu lịch sử luyện tập chính là nơi thể hiện rõ nhất “dấu vết học tập” của người dùng. Việc bảo vệ phần dữ liệu này bằng mã hóa cho thấy ta đã tiếp cận bài toán an toàn thông tin theo đúng tinh thần của đề tài.

Tuy nhiên, ta cũng cần nhìn nhận các giới hạn hiện hữu một cách nghiêm túc. Dù đã có mã hóa, cơ chế quản lý khóa hiện tại vẫn ở mức cơ bản. Khóa gốc được đưa vào từ biến môi trường frontend và dùng chung cho ứng dụng. Điều đó có nghĩa là hệ thống chưa có cơ chế luân chuyển khóa, chưa tách khóa theo người dùng và chưa sử dụng dịch vụ quản lý khóa chuyên biệt. Bên cạnh đó, một số metadata vẫn lưu ở dạng rõ để phục vụ truy vấn, nên chưa thể xem đây là mô hình mã hóa toàn bộ cơ sở dữ liệu.

Dẫu vậy, trong phạm vi của một hệ thống học tập và nghiên cứu, cách triển khai này đã đủ để thể hiện rõ ý tưởng và năng lực ứng dụng mật mã vào bảo vệ dữ liệu thực tế.

---

## 3.6. Kết luận chương

Qua phần thực nghiệm, ta có thể khẳng định rằng nội dung nổi bật nhất của hệ thống **CryptoLearn** không chỉ nằm ở phần hiển thị lý thuyết hay mô phỏng thuật toán, mà nằm ở việc ta đã **sử dụng AES để mã hóa dữ liệu học tập của người dùng trước khi lưu vào Firestore**.

Cơ chế này được triển khai cụ thể bằng cách:

- dẫn xuất khóa từ bí mật gốc bằng SHA-256,
- sinh IV ngẫu nhiên cho mỗi lần mã hóa,
- sử dụng AES ở chế độ CBC với PKCS7 padding,
- mã hóa phần dữ liệu chi tiết của thống kê học tập và lịch sử luyện tập,
- giải mã dữ liệu khi cần truy xuất trên giao diện hồ sơ.

Việc mã hóa dữ liệu có ý nghĩa trực tiếp trong việc bảo vệ thông tin học tập cá nhân của người dùng, bao gồm kết quả luyện tập, chi tiết câu trả lời và tiến trình học tập qua thời gian. Điều này làm cho hệ thống mang tính nhất quán cao hơn về mặt học thuật: website không chỉ dạy mật mã mà còn áp dụng mật mã để bảo vệ chính dữ liệu mà nó tạo ra.

Từ góc độ an toàn thông tin, ta xem đây là điểm thực nghiệm có giá trị nhất của đề tài, bởi nó thể hiện rõ tư duy thiết kế hệ thống an toàn: dữ liệu càng mang tính cá nhân và phản ánh hành vi người dùng thì càng cần được bảo vệ ngay từ tầng lưu trữ.

Nếu muốn, ta có thể tiếp tục viết lại cho đúng hẳn bố cục ngắn gọn trong luận văn:
- `3.1 Chuẩn bị và thực hiện`
- `3.2 Kết quả và kết luận`
với văn phong mượt hơn để chép thẳng vào báo cáo.
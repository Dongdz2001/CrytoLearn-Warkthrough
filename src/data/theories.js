const theories = {
  caesar: {
    title: 'Caesar Cipher',
    history: `Caesar Cipher là một trong những kỹ thuật mã hóa đơn giản và lâu đời nhất. Nó được đặt theo tên Julius Caesar, người đã sử dụng phương pháp này để liên lạc bí mật với các tướng lĩnh.`,
    howItWorks: `Mỗi ký tự trong bản rõ (plaintext) được dịch chuyển một số vị trí cố định trong bảng chữ cái.

**Ví dụ với shift = 3:**
- A → D, B → E, C → F, ...
- "HELLO" → "KHOOR"

**Công thức:**
- Mã hóa: E(x) = (x + n) mod 26
- Giải mã: D(x) = (x - n) mod 26`,
    security: `🔴 **Rất yếu** — Chỉ có 25 khả năng dịch chuyển, dễ dàng brute-force. Chỉ mang tính lịch sử.`,
  },
  vigenere: {
    title: 'Vigenère Cipher',
    history: `Được Blaise de Vigenère phát triển vào thế kỷ 16, từng được gọi là "mật mã không thể phá" (le chiffre indéchiffrable) trong suốt 300 năm.`,
    howItWorks: `Sử dụng một từ khóa (keyword) để tạo nhiều phép dịch chuyển khác nhau cho từng ký tự.

**Ví dụ: Plaintext = "HELLO", Key = "KEY"**
- H + K(10) = R
- E + E(4) = I
- L + Y(24) = J
- L + K(10) = V
- O + E(4) = S
→ Ciphertext: "RIJVS"`,
    security: `🟡 **Trung bình** — An toàn hơn Caesar nhưng vẫn có thể phá bằng phân tích tần suất (Kasiski) nếu biết độ dài key.`,
  },
  atbash: {
    title: 'Atbash Cipher',
    history: `Có nguồn gốc từ bảng chữ cái Hebrew cổ đại. Tên "Atbash" là ghép từ chữ cái đầu (Aleph) và cuối (Tav) của bảng chữ cái Hebrew.`,
    howItWorks: `Đảo ngược vị trí mỗi ký tự trong bảng chữ cái.

**Quy tắc:**
- A ↔ Z, B ↔ Y, C ↔ X, ...
- "HELLO" → "SVOOL"

Atbash là **tự nghịch đảo** — mã hóa 2 lần sẽ ra lại bản gốc.`,
    security: `🔴 **Rất yếu** — Chỉ có 1 cách mã hóa duy nhất, dễ dàng nhận diện.`,
  },
  rot13: {
    title: 'ROT13',
    history: `ROT13 là trường hợp đặc biệt của Caesar Cipher với shift = 13. Phổ biến trên các diễn đàn Internet từ thập niên 1980 để ẩn spoiler hoặc nội dung nhạy cảm.`,
    howItWorks: `Dịch chuyển mỗi chữ cái 13 vị trí. Vì bảng chữ cái có 26 ký tự nên ROT13 là **tự nghịch đảo**.

**Ví dụ:**
- "HELLO" → "URYYB"
- "URYYB" → "HELLO" (giải mã = mã hóa lần nữa)`,
    security: `🔴 **Không có tính bảo mật** — Chỉ dùng để che giấu nội dung tạm thời, không phải để bảo vệ dữ liệu.`,
  },
  xor: {
    title: 'XOR Cipher',
    history: `XOR (Exclusive OR) là nền tảng của nhiều thuật toán mã hóa hiện đại. One-Time Pad (OTP) — mật mã duy nhất không thể phá — cũng dựa trên XOR.`,
    howItWorks: `Mỗi byte của plaintext được XOR với byte tương ứng của key.

**Tính chất XOR:**
- A ⊕ B ⊕ B = A (tự nghịch đảo)
- 0 ⊕ 0 = 0, 1 ⊕ 1 = 0
- 0 ⊕ 1 = 1, 1 ⊕ 0 = 1

**Ví dụ:** 'H' (72) ⊕ 'K' (75) = 3 → mã hóa
3 ⊕ 'K' (75) = 72 → 'H' giải mã`,
    security: `🟡 **Phụ thuộc vào key** — Nếu key ngắn hơn plaintext và lặp lại → yếu. Nếu key dài ngẫu nhiên bằng plaintext → không thể phá (One-Time Pad).`,
  },
  aes: {
    title: 'AES (Advanced Encryption Standard)',
    history: `AES được NIST chọn làm tiêu chuẩn mã hóa năm 2001, thay thế DES. Được thiết kế bởi Joan Daemen và Vincent Rijmen (Rijndael). AES được sử dụng rộng rãi trong HTTPS, WiFi (WPA2), VPN, v.v.`,
    howItWorks: `AES là mã khối (block cipher) hoạt động trên khối 128 bit.

**Các bước chính:**
1. SubBytes — thay thế byte qua S-box
2. ShiftRows — dịch hàng byte
3. MixColumns — trộn cột
4. AddRoundKey — XOR với round key

**Key size:** 128 / 192 / 256 bit
**Mode:** ECB (đơn giản, không an toàn), CBC (an toàn hơn, cần IV)`,
    security: `🟢 **Rất mạnh** — Tiêu chuẩn toàn cầu, không có lỗ hổng thực tế được biết đến.`,
  },
  des: {
    title: 'DES / 3DES',
    history: `DES (Data Encryption Standard) được IBM phát triển năm 1970 và trở thành tiêu chuẩn liên bang Mỹ năm 1977. Do key chỉ 56 bit nên đã bị phá vào 1999. 3DES mã hóa 3 lần DES để tăng độ an toàn.`,
    howItWorks: `DES là mã khối 64 bit với key 56 bit, sử dụng mạng Feistel 16 vòng.

**3DES:** Encrypt(K1) → Decrypt(K2) → Encrypt(K3)
Với 3 key khác nhau → key hiệu dụng 168 bit.`,
    security: `🟡 **DES: Yếu** (key 56 bit). **3DES: Trung bình** — an toàn hơn nhưng chậm, đang bị thay thế bởi AES.`,
  },
  rsa: {
    title: 'RSA (Rivest–Shamir–Adleman)',
    history: `RSA được công bố năm 1977 bởi Ron Rivest, Adi Shamir và Leonard Adleman. Là thuật toán mã hóa bất đối xứng đầu tiên được sử dụng rộng rãi.`,
    howItWorks: `Dựa trên bài toán **phân tích thừa số nguyên tố** (rất khó với số lớn).

**Tạo key:**
1. Chọn 2 số nguyên tố lớn p, q
2. n = p × q, φ(n) = (p-1)(q-1)
3. Chọn e sao cho gcd(e, φ(n)) = 1
4. Tính d = e⁻¹ mod φ(n)
- **Public key:** (n, e)
- **Private key:** (n, d)

**Mã hóa:** C = M^e mod n
**Giải mã:** M = C^d mod n`,
    security: `🟢 **Mạnh** (với key ≥ 2048 bit). Nền tảng của HTTPS, chữ ký số.`,
  },
  'rsa-signature': {
    title: 'Chữ ký số RSA',
    history: `Chữ ký số là ứng dụng quan trọng nhất của mã hóa bất đối xứng. Dùng để xác thực danh tính người gửi và đảm bảo dữ liệu không bị thay đổi.`,
    howItWorks: `**Ký (Sign):**
1. Hash thông điệp → H(M)
2. Ký bằng private key: S = H(M)^d mod n

**Xác minh (Verify):**
1. Hash thông điệp → H(M)
2. Giải mã chữ ký: H' = S^e mod n
3. So sánh H(M) == H' → ✅ Hợp lệ / ❌ Không hợp lệ

**Ứng dụng:** SSL/TLS certificate, PDF signing, email S/MIME.`,
    security: `🟢 **Mạnh** — Không thể giả mạo chữ ký mà không có private key.`,
  },
  hash: {
    title: 'Hàm băm (MD5, SHA)',
    history: `MD5 được Ronald Rivest tạo ra năm 1991. SHA (Secure Hash Algorithm) được NSA thiết kế. SHA-256 là một phần của SHA-2, sử dụng trong Bitcoin và nhiều ứng dụng bảo mật.`,
    howItWorks: `Hàm băm biến đổi dữ liệu bất kỳ thành chuỗi có **độ dài cố định**.

**Tính chất:**
- **Một chiều:** Không thể tìm ngược input từ hash
- **Chống va chạm:** Khó tìm 2 input cho cùng hash
- **Hiệu ứng tuyết lở:** Thay đổi 1 bit → hash thay đổi hoàn toàn

| Thuật toán | Độ dài output |
|-----------|--------------|
| MD5 | 128 bit (32 hex) |
| SHA-1 | 160 bit (40 hex) |
| SHA-256 | 256 bit (64 hex) |
| SHA-512 | 512 bit (128 hex) |`,
    security: `🔴 **MD5, SHA-1: Yếu** (đã tìm thấy va chạm). 🟢 **SHA-256, SHA-512: Mạnh.**`,
  },
  base64: {
    title: 'Base64 Encoding',
    history: `Base64 được phát triển để truyền dữ liệu nhị phân qua các giao thức chỉ hỗ trợ ASCII, như email (MIME).`,
    howItWorks: `Chuyển mỗi 3 byte (24 bit) thành 4 ký tự Base64 (6 bit/ký tự).

**Bảng ký tự:** A-Z, a-z, 0-9, +, / (và = để padding)

**Ví dụ:** "Hi" → "SGk="
- 'H' = 72, 'i' = 105
- Binary: 01001000 01101001
- Chia nhóm 6 bit: 010010 000110 1001(00)
- Index: 18, 6, 36 → S, G, k, =`,
    security: `🔴 **Không có tính bảo mật** — Base64 là encoding, KHÔNG phải encryption. Ai cũng có thể decode.`,
  },
  'hex-binary': {
    title: 'Hex / Binary Convert',
    history: `Hex (thập lục phân) và Binary (nhị phân) là hệ đếm cơ bản trong khoa học máy tính, được sử dụng rộng rãi trong lập trình và phân tích dữ liệu.`,
    howItWorks: `**Hex (cơ số 16):** dùng 0-9 và A-F
- Mỗi ký tự Hex = 4 bit
- "Hi" → "48 69"

**Binary (cơ số 2):** dùng 0 và 1
- Mỗi ký tự ASCII = 8 bit
- "Hi" → "01001000 01101001"`,
    security: `🔴 **Không có tính bảo mật** — Chỉ là thay đổi cách biểu diễn, không mã hóa.`,
  },
};

export default theories;

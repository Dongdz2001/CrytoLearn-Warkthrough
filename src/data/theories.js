const theories = {
  caesar: {
    title: 'Báo cáo Phân tích: Hệ mật Caesar (Caesar Cipher)',
    history: `### 1. Giới thiệu & Bối cảnh lịch sử
Hệ mật Caesar (Caesar Cipher) là một trong những kỹ thuật mã hóa thay thế đơn giản nhất và được biết đến rộng rãi nhất trong lịch sử mật mã học. Được đặt theo tên của **Julius Caesar**, vị hoàng đế La Mã đã sử dụng phương pháp này để bảo mật các thông điệp quân sự chiến lược từ hơn 2,000 năm trước. 

Mặc dù có cấu trúc sơ khai, Caesar Cipher đặt nền móng cho các hệ mật mã thay thế đơn biểu (monoalphabetic substitution) phát triển sau này.

![Cơ chế xoay vòng của hệ mật Caesar (Gemini-Banana Style)](/assets/caesar_theory.png)`,
    howItWorks: `### 2. Nguyên lý Kỹ thuật
Hệ mật này vận hành trên tập hợp các chữ cái Latinh (26 ký tự), trong đó mỗi ký tự được thay thế bằng một ký tự khác nằm cách nó một khoảng cách cố định $k$ trong bảng chữ cái tuần hoàn.

#### 2.1 Biểu diễn Toán học
Mỗi chữ cái được chuẩn hóa thành một số nguyên trong khoảng $[0, 25]$ (A=0, B=1, ..., Z=25).

#### 2.2 Quy trình thực thi (Algorithms)

**A. Thuật toán Mã hóa (Encryption):**
Dịch chuyển giá trị đại diện của ký tự sang phải $k$ bước (với $k$ là khóa bí mật).

$$ E_k(m) = (m + k) \\bmod 26 $$

**B. Thuật toán Giải mã (Decryption):**
Dịch chuyển ngược lại sang trái $k$ bước để khôi phục bản rõ ban đầu.

$$ D_k(c) = (c - k) \\bmod 26 $$

> **Lưu ý kỹ thuật:** Trong tính toán thực tế, nếu $(c - k) < 0$, ta thực hiện phép toán cộng thêm 26 để đảm bảo giá trị nằm trong trường hữu hạn $\\mathbb{Z}_{26}$.

$$ (c - k) \\pmod{26} \\equiv (c - k + 26) \\bmod 26 $$

---

**Ví dụ thực nghiệm (với $k = 3$):**
- **Bản rõ (Plaintext):** \`HELLO\`
- **Tính toán:** $7+3=10$, $4+3=7$, $11+3=14$, $11+3=14$, $14+3=17$
- **Bản mã (Ciphertext):** \`KHOOR\`
`,
    security: `### 3. Đánh giá An toàn & Thám mã
Dưới góc độ an ninh mạng hiện đại, hệ mật Caesar được xếp vào nhóm **không an toàn** do hai yếu tố cốt lõi:

1. **Không gian khóa hạn chế (Brute-force):** Chỉ tồn tại $25$ khóa khả thi (loại trừ $k=0$). Kẻ tấn công có thể dễ dàng thực hiện tấn công duyệt cạn (Exhaustive key search) trong thời gian ngắn.
2. **Phân tích tần suất (Frequency Analysis):** Do tính chất thay thế đơn biểu, quy luật phân phối tần suất của các chữ cái trong ngôn ngữ tự nhiên (như chữ 'E' xuất hiện nhiều nhất trong tiếng Anh) không bị triệt tiêu, cho phép thám mã hiệu quả mà không cần biết khóa.`,
    practice: {
      question: `Sử dụng Mật mã Caesar với **khóa $k = 5$**, hãy mã hóa bản rõ sau (viết hoa liền nhau): **APPLE**`,
      answer: `FUUQJ`,
      explanation: `Dựa vào phép tịnh tiến $k=5$:
- A (0) + 5 = 5 $\\rightarrow$ **F**
- P (15) + 5 = 20 $\\rightarrow$ **U**
- P (15) + 5 = 20 $\\rightarrow$ **U**
- L (11) + 5 = 16 $\\rightarrow$ **Q**
- E (4) + 5 = 9 $\\rightarrow$ **J**

Nên kết quả là **FUUQJ**.`
    }
  },
  vigenere: {
    title: 'Vigenère Cipher',
    history: `Được phát triển vào thế kỷ 16, từng được gọi là "mật mã không thể phá" (le chiffre indéchiffrable). Đây là một dạng mật mã thay thế đa biểu (polyalphabetic substitution), giúp chống lại thành công phương pháp phân tích tần suất.

![Hệ thống đĩa mã đa biểu Vigenère (Gemini-Banana Style)](/assets/vigenere_theory.png)`,
    howItWorks: `Sử dụng một từ khóa lặp lại (keyword) để xác định phép dịch chuyển cho từng ký tự một. Mỗi ký tự trong từ khóa đóng vai trò như một khóa $K_i$ của bản thân nó trong hệ mã Caesar.

**Bảng tra cứu chỉ số chữ cái (A=0, B=1...):**
| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10| 11| 12| 13| 14| 15| 16| 17| 18| 19| 20| 21| 22| 23| 24| 25|

**Công thức chung:**
- **Mã hóa:** $C_i = (M_i + K_i) \\pmod{26}$
- **Giải mã:** $M_i = (C_i - K_i + 26) \\pmod{26}$

**Ví dụ thực nghiệm:**
Ta mã hóa từ \`HELLO\` với từ khóa \`KEY\`:
- **Bản rõ $M_i$:** \`H(7), E(4), L(11), L(11), O(14)\`
- **Từ khóa $K_i$:** \`KEY\` (lặp lại thành \`KEYKE\`) $\\rightarrow$ \`K(10), E(4), Y(24), K(10), E(4)\`
- **Cộng (Modulo 26):**
  - $7+10=17 \\rightarrow$ **R**
  - $4+4=8 \\rightarrow$ **I**
  - $11+24=35 \\equiv 9 \\rightarrow$ **J**
  - $11+10=21 \\rightarrow$ **V**
  - $14+4=18 \\rightarrow$ **S**
- **Kết quả bản mã:** \`RIJVS\``,
    security: `🟡 **Trung bình/Yếu** — An toàn hơn Caesar vì một chữ cái trong bản rõ có thể biến thành nhiều chữ cái khác nhau trong bản mã tùy vị trí từ khóa. Tuy nhiên với máy tính hiện đại, kẻ tấn công có thể đo chiều dài khóa (phương pháp Kasiski) để dịch ngược hoàn toàn.`,
    practice: {
      question: `Sử dụng Mật mã Vigenère, mã hóa chữ **DOG** với từ khóa **PIG**. (gợi ý: P=15, I=8, G=6)`,
      answer: `SWM`,
      explanation: `Ta cộng giá trị của từng chữ cái Modulo 26:
- **D** (3) + **P** (15) = 18 $\\rightarrow$ **S**
- **O** (14) + **I** (8) = 22 $\\rightarrow$ **W**
- **G** (6) + **G** (6) = 12 $\\rightarrow$ **M**

Nên kết quả là **SWM**.`
    }
  },
  atbash: {
    title: 'Atbash Cipher',
    history: `Có nguồn gốc từ ngôn ngữ Hebrew cổ đại. Tên "Atbash" lấy từ chữ cái đầu và cuối của bảng chữ cái. Đây là một mật mã thay thế đơn biểu đơn giản nhất do thao tác không hề cần đến từ khóa.

![Tính đối xứng gương của Atbash (Gemini-Banana Style)](/assets/atbash_theory.png)`,
    howItWorks: `Cơ chế cực kỳ đơn giản: **Đảo ngược vị trí mỗi ký tự** trong bảng chữ cái tương ứng. 

**Bảng tra cứu lật ngược (Atbash Lookup Table):**

Đây là mã **tự nghịch đảo** — nghĩa là quy trình mã hóa và giải mã hoàn toàn giống hệt nhau. Bạn chỉ cần lấy chữ cái tương ứng từ bảng trên 1 lần. 
*Ví dụ:* "HELLO" → "SVOOL" và giải mã "SVOOL" → "HELLO".`,
    security: `🔴 **Vô cùng yếu** — Hoàn toàn không cấu thành một không gian khóa bảo mật. Bất kỳ ai nhận thấy đây là mã Atbash đều có thể lật bảng chữ cái và dịch ngay lập tức mà không cần đoán mật khẩu.`,
    practice: {
      question: `Sử dụng bảng mật mã Atbash ở phần lý thuyết, hãy giải mã bản mã sau: **KVM**`,
      answer: `PEN`,
      explanation: `Tra bảng lật ngược trên phần lý thuyết:
- K $\rightarrow$ P
- V $\rightarrow$ E
- M $\rightarrow$ N

Kết quả giải mã là **PEN**.`
    }
  },
  xor: {
    title: 'XOR Cipher (Hệ mật Vernam)',
    history: `Mật mã dòng sử dụng phép toán logic đại số Boolean XOR để kết hợp bit (hoặc ký tự) dữ liệu gốc với bit (hoặc ký tự) khóa. Hệ mật One-Time Pad nguyên thủy được Vernam phát minh dựa trên nền tảng cơ bản của XOR.

![Phép toán Logic Bitwise XOR (Gemini-Banana Style)](/assets/xor_theory.png)`,
    howItWorks: `### 2. Nguyên lý Kỹ thuật
Mã hóa và giải mã điều khiển dữ liệu qua phép toán Bitwise XOR (đại diện là dấu $\\oplus$).

#### 2.1 Bảng Chân Lý XOR (Mệnh đề Logic)
Cơ chế XOR trả về giá trị **1** khi hai đầu vào khác nhau, và trả về **0** khi hai đầu vào giống nhau. Đây là "hạt nhân" của hầu hết các hệ mật mã học hiện đại.

**Tính chất Tự nghịch đảo xuất sắc:**
$$ A \\oplus B \\oplus B = A $$
Do tính đối xứng này, quá trình mã hóa và giải mã thực chất diễn ra bằng cùng cấu trúc toán học:
- **Mã hóa:**
$$ c_i = m_i \\oplus z_i $$
- **Giải mã:**
$$ m_i = c_i \\oplus z_i $$

*(Trong đó $z_i$ là các bit dữ liệu từ dòng khóa mã được sinh ngẫu nhiên)*

---

**Ví dụ thực nghiệm (Toán nhị phân):**
- **Bản rõ $m$:** \`1101\`
- **Khóa $k$:** \`1011\`
- **Mã hóa ($m \\oplus k$):**
  - $1 \\oplus 1 = 0$
  - $1 \\oplus 0 = 1$
  - $0 \\oplus 1 = 1$
  - $1 \\oplus 1 = 0$
- **Bản mã $c$:** \`0110\`
`,
    security: `Đạt độ an toàn tuyệt đối (Perfect Secrecy) nếu và chỉ nếu khóa được sử dụng duy nhất một lần, phải ngẫu nhiên hoàn toàn và dài bằng văn bản (One-Time Pad). Trong thực tế, các bộ tạo giả ngẫu nhiên (chẳng hạn như RC4 hoặc LFSR) có thể bị hack nếu tái sử dụng khóa.`,
    practice: {
      question: `Thực hiện quy tắc phép toán XOR giữa hai chuỗi bit nhị phân sau để ra kết quả cuối:
- Dữ liệu $m$: **1010**
- Khóa $k$: **1100**`,
      answer: `0110`,
      explanation: `Áp dụng bảng chân lý XOR cho từng cặp bit đối xứng từ trái sang phải:
- 1 $\\oplus$ 1 = 0
- 0 $\\oplus$ 1 = 1
- 1 $\\oplus$ 0 = 1
- 0 $\\oplus$ 0 = 0

Nối kết quả lại ta được: **0110**`
    }
  },
  aes: {
    title: 'AES (Advanced Encryption Standard)',
    history: `AES (thuật toán Rijndael) chiến thắng cuộc thi của NIST năm 2000, ban hành chuẩn năm 2001 thay thế DES vì DES không còn an toàn. Khối dữ liệu: 128 bit. Khóa: 128, 192 hoặc 256 bit với số vòng lặp tương ứng 10, 12, 14. Thiết kế theo mạng thay thế-hoán vị (SPN).

![Ma trận trạng thái và biến đổi AES (Gemini-Banana Style)](/assets/aes_theory.png)`,
    howItWorks: `Dữ liệu trong AES biểu diễn dưới dạng ma trận state $4 \\times 4$ byte. Mỗi vòng lặp thực hiện 4 biến đổi:
1. **SubBytes**: Thế byte phi tuyến qua các S-box (Lookup table hỗn loạn sinh sẵn).
2. **ShiftRows**: Dịch chuyển các hàng của ma trận state tạo hiệu ứng phân kỳ (Diffusion).
3. **MixColumns**: Nhân ma trận các cột trên trường hữu hạn $GF(2^8)$.
4. **AddRoundKey**: Trộn trạng thái hiện thời với khóa con vòng $K_i$ bằng thao tác XOR.

Phép giải mã dùng biến đổi ma trận nghịch đảo để lùi dữ liệu về trạng thái nguyên bản.

---

**Ví dụ thực nghiệm (Phép thế SubBytes):**
Giả sử có 1 byte trong ma trận trạng thái là \`0x19\`. 
- Tra bảng S-Box tại hàng 1, cột 9.
- Kết quả nhận được là \`0xd4\`.
- Sau đó, byte này sẽ được dịch hàng (ShiftRows) và trộn cột (MixColumns) để lan tỏa sự thay đổi ra toàn bộ 16 byte của khối.
`,
    security: `🟢 **Rất mạnh** — Không có kỹ thuật tấn công toán học nào có thể phá vỡ cốt lõi AES trong thời gian khả thi bằng PC hiện nay. Hacker thường chỉ nhắm đến các lỗ hổng phần cứng rò rỉ (Side Channel Attack).`,
    practice: {
      question: `Trong 4 bước thực thi của một vòng lặp AES, bước nào chịu trách nhiệm *thế byte phi tuyến tính* phụ thuộc vào một hộp tra cứu (S-box)? (Nhập đúng tên tiếng anh)`,
      answer: `SubBytes`,
      explanation: `Đó là bước **SubBytes**. ShiftRows chỉ dịch hàng, MixColumns trộn dữ liệu các cột, còn AddRoundKey là chỉ tiến hành cộng Modulo (XOR) với khóa vòng.`
    }
  },
  des: {
    title: 'Triple DES (3DES) & Mạng Feistel',
    history: `Mật mã Triple DES (3DES) là phiên bản nâng cấp của chuẩn mã khối DES nguyên bản, sử dụng Cấu trúc Mạng lưới Feistel (do Horst Feistel phát minh). Trong khi DES đã trở nên lạc hậu, **Triple DES** đã giải quyết lỗ hổng bảo mật bằng cách áp dụng thuật toán DES ba lần liên tiếp cho từng khối dữ liệu, tăng cường đáng kể khả năng phòng thủ trước các cuộc tấn công Brute-force.

![Cấu trúc Mạng Feistel trong Triple DES (Gemini-Banana Style)](/assets/des_theory.png)`,
    howItWorks: `Mạng Feistel chia khối dữ liệu làm 2 nửa trái (L/Left) và phải (R/Right).
Tại mỗi vòng lặp thứ $i$:
- Nửa trái sao chép nửa phải cũ: 
$$ L_i = R_{i-1} $$
- Nửa phải kết hợp XOR với hàm vòng $F$:
$$ R_i = L_{i-1} \\oplus F(R_{i-1}, K_i) $$
*(Với $F$ là hàm vòng biến đổi dữ liệu phi tuyến (chứa phép mở rộng, thế S-boxes, xáo trộn), $K_i$ là khóa phụ sinh từ Key chính)*

Đặc trưng mạng Feistel: Mã hóa và giải mã sử dụng chung một cấu trúc mạch vi điện tử duy nhất, chu kỳ giải mã bản chất chỉ là chạy mã hóa nhưng nạp khóa vòng $K_i$ ngược lại từ dưới lên.

---

**Ví dụ thực nghiệm (Vòng lặp Feistel):**
Giả sử khối 64-bit được chia thành $L_0$ và $R_0$.
- **Vòng 1:**
  - $L_1 = R_0$
  - $R_1 = L_0 \\oplus F(R_0, K_1)$
- **Vòng 2:**
  - $L_2 = R_1$
  - $R_2 = L_1 \\oplus F(R_1, K_2)$
Quá trình này lặp lại 16 lần để tạo ra bản mã cuối cùng.
`,
    security: `🟡 **Yếu dần** — Chìa khóa DES nguyên bản 56-bit đã bị bẻ mặt từ lâu bằng siêu máy tính vét cạn (EFF DES cracker). 3DES an toàn hơn nhờ khóa lên tới 168-bit nhưng xử lý tốn CPU và chậm hơn AES rất nhiều.`,
    practice: {
      question: `Tên của cấu trúc/mạng lưới mà thuật toán DES sử dụng để phân đôi khối dữ liệu $L_i$ and $R_i$ đảo chéo qua các vòng lặp là gì? (Tên nhà khoa học Horst ...)`,
      answer: `Feistel`,
      explanation: `Đó là Cấu trúc **Mạng Feistel**. Cấu trúc này nổi tiếng ở điểm mạch mã hóa và giải mã có thể dùng chung một luồng, vì cơ chế XOR song hành.`
    }
  },
  rsa: {
    title: 'RSA (Thuật toán Mã hóa Khóa Công Khai)',
    history: `Là hệ mật phi đối xứng vững chãi và áp dụng cực kì thành công trong Internet Security hiện đại (HTTPS, TLS), đi vào đời sống từ các khái niệm của lý thuyết số nguyên tố.

![Nguyên lý Sinh khóa RSA từ Số nguyên tố (Gemini-Banana Style)](/assets/rsa_theory.png)`,
    howItWorks: `Khóa public and private là cặp khóa không cân xứng.
**Sinh khóa (Cơ sở toán đại số logic)**:
1. Chọn 2 số nguyên tố siêu lớn bí mật $p, q$. Tính modul $n$ và hàm Euler $\\phi(n)$:
$$ n = p \\times q $$
$$ \\phi(n) = (p-1)(q-1) $$
2. Chọn số mũ công khai $e$ (thường là $65537$):
$$ \\gcd(e, \\phi(n)) = 1 $$
3. Tính khóa bí mật $d$ (nghịch đảo của $e$ trong modulo $\\phi$):
$$ e \\cdot d \\equiv 1 \\pmod{\\phi(n)} $$
- **Khóa Công khai (Public Key):** $(n, e)$
- **Khóa Bí mật (Private Key):** $(n, d)$

**Định lượng Toán Học**:
- **Mã hóa (Mã hóa tin):**
$$ c = m^e \\bmod n $$
- **Tại máy chủ (Giải mã tin):**
$$ m = c^d \\bmod n $$
*(Chứng minh bằng Euler-Fermat: $m^{ed} \\equiv m \\pmod n$)*`,
    security: `🟢 **Rất mạnh** — Dựa trên thời gian cực hạn của bài toán phân tích thừa số lượng tử phân mảnh. Hiện nay yêu cầu khóa lớn (>= 2048 bit). Do tốc độ quá tốn kém hệ thống, khóa RSA thường chỉ gói thông điệp chìa khóa phiên (Key Exchange) để nhường đường cho mã khối đối xứng tải dữ liệu.`,
    practice: {
      question: `Trong giai đoạn Sinh khóa RSA: Hãy chọn 2 số nguyên tố giả thiết siêu nhỏ $p = 7, q = 11$. Hãy tính giá trị Modulo lõi hệ thống **n** bằng bao nhiêu?`,
      answer: `77`,
      explanation: `Cơ sở của mã RSA là tích phần của hai số nguyên tố rất lớn.\n$n = p \\times q = 7 \\times 11 = 77$. \n\nTrong thực tế người ta dùng $p, q$ có hàng trăm chữ số để kẻ xấu không thể phân tích ngược $77$ thành $7 \\times 11$ được!`
    }
  },
  'rsa-signature': {
    title: 'Chữ ký số RSA',
    history: `Đây là giải pháp hoàn chỉnh cho chứng thực danh tính (Authentication), bảo vệ toàn vẹn (Integrity) và chống thoái thác trách nhiệm (Non-repudiation) khi giao dịch trực tuyến.

![Chữ ký điện tử và Xác thực RSA (Gemini-Banana Style)](/assets/rsa_signature_theory.png)`,
    howItWorks: `Chữ ký RSA thực chất là hoán đổi công năng của Khóa Private và Public trên mã RSA.
**Lượt ký (thực thi trên ngón tay Private $d$)**:
Để xác nhận, người gửi băm Hash dữ liệu $H(m)$ và nhúng chìa khóa Private:
$$ s = (H(m))^d \\bmod n $$

**Lượt kiểm tra (bất kỳ ai cầm chìa Public $e$)**:
Trích xuất Hash bằng Public Key:
$$ h' = s^e \\bmod n $$
Đồng thời, tự tay băm dữ liệu gốc ra $h$. Nếu $h' = h$, chứng tỏ chỉ có người giữ khóa $d$ mới tạo ra được $s$.
*(Toán học: $s^e = (h^d)^e = h^{ed} \\equiv h$)*

---

**Ví dụ thực nghiệm (Số nhỏ):**
Giả sử $n=33, e=3, d=7$ (Khóa RSA đã sinh).
Thông điệp băm có giá trị $h = 10$.
1. **Người ký:** $s = 10^7 \\bmod 33 = 10$
2. **Người nhận:** $h' = 10^3 \\bmod 33 = 10$
Vì $h' = h = 10$, chữ ký hợp lệ.
`,
    security: `🟢 **An toàn cao** — Chữ ký số RSA rất khó làm giả nếu khóa Private $d$ được bảo mật tốt. Nó là nền tảng của các chứng chỉ SSL/TLS hiện nay.`,
    practice: {
      question: `Khi Bob muốn gửi một hợp đồng điện tử được *Ký số đại diện* bởi Bob cho Alice, Bob phải dùng loại hàm khóa nào của chính mình để mã hóa Chữ ký gốc? (Nhập "Public" hoặc "Private")`,
      answer: `Private`,
      explanation: `Theo nguyên lý Xác thực Điện tử (Authentication), người gửi phải kí nhận chứng chỉ bằng **Khóa Private (Bí mật)** của chính họ để làm bảo chứng. Mọi người khác (kể cả Alice) sẽ tốn công giải mã đối chiếu bằng Khóa Public để kiểm tra.`
    }
  },
  hash: {
    title: 'Hàm băm MD5 (MD5 Hash Function)',
    history: `Thuật toán băm (Hash Function) thực hiện việc biến đổi một khối dữ liệu không giới hạn thành một "vân tay thông điệp" có độ dài cố định. Trong đó, MD5 là một trong những chuẩn băm phổ biến nhất trong lịch sử máy tính.

![Minh họa cơ chế Hàm băm (Gemini-Banana Style)](/assets/hash_theory.png)`,
    howItWorks: `Quá trình thực thi $h = H(m)$ dùng vô vàn hàm cộng toán và XOR tuyến nghịch, **không có khóa** và **không có hàm nghịch đảo**.

#### 2.2 Cấu trúc Thuật toán MD5
MD5 là một ví dụ điển hình của cấu trúc băm khối. Dữ liệu văn bản được chia thành các khối 512-bit. Sau đó, nó sử dụng **4 thanh ghi 32-bit** (A, B, C, D) làm trạng thái trung gian.

![Sơ đồ 4 thanh ghi A-B-C-D và quy trình 64 vòng băm của MD5 (Gemini-Banana Style)](/assets/md5_theory.png)

Thông điệp trải qua 64 vòng lặp (với các hàm phi tuyến $F, G, H, I$), trộn lẫn trạng thái của 4 thanh ghi này để sản sinh ra chuỗi vân tay cuối cùng dài **128-bit**.

---

**Ví dụ thực nghiệm (Vân tay số):**
Mã hóa từ \`hello\`:
- **MD5:** \`5d41402abc4b2a76b9719d911017c592\`
Chỉ cần thay đổi một chữ cái (ví dụ \`Hello\`), toàn bộ chuỗi MD5 sẽ thay đổi hoàn toàn.
`,
    security: `🔴 **Cảnh báo Nguy hiểm** — MD5 hiện được coi là **đã bị phá vỡ hoàn toàn**. Kẻ tấn công có thể tạo ra va chạm (Collision) dễ dàng. **KHÔNG** sử dụng cho các mục đích bảo mật đòi hỏi tính an toàn cao. Hãy luôn kết hợp **Salt** để hạn chế tấn công.`,
    practice: {
      question: `Thuật toán băm đòi hỏi tính chất bảo vệ nào để kẻ gian "Không thể lấy chuỗi mã $h$ và dịch ngược tìm ra văn bản $m$ gốc"? (Gợi ý nằm trong từ Kháng ... ảnh)`,
      answer: `Kháng tiền ảnh`,
      explanation: `Đó là lý thuyết **Kháng tiền ảnh 1 chiều** (Pre-image Resistance). Hàm băm là hàm bất thuận nghịch, nó băm nát và trộn lẫn các bit dữ liệu chứ không mã hóa nguyên sơ để giải lại được.`
    }
  }
};

export default theories;

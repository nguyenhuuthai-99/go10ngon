export interface Quote {
  text: string;
  author: string;
  title: string;
}

const quotes: Quote[] = [
  {
    text: "Ra đi không phải bao giờ cũng đồng nghĩa với một sự từ bỏ, đó cũng có thể là một cách để giữ gìn những gì đã trải qua, nếu người ta biết ra đi trước khi quá trễ.",
    author: "Marc Levy",
    title: "Em ở đâu",
  },
  {
    text: "Đàn bà thật tàn nhẫn với những kẻ họ không yêu.",
    author: "Alexandre Dumas",
    title: "Trà hoa nữ",
  },
  {
    text: "Lý do sự chết cứ bám riết lấy sự sống như vậy không phải là vì nhu cầu sinh học - đó là sự ghen tị. Sự sống đẹp đến nỗi sợ chết đã phải lòng nó, một mối tình tư vị đầy ghen tuông quắp chặt lấy bất cứ thứ gì nó có thể động đến. Nhưng sự sống nhẹ nhàng bỏ qua, mất mát vài thứ chẳng gì đáng kể, và nỗi u buồn chỉ như một bóng mây bay.",
    author: "Yann Martel",
    title: "Cuộc đời của Pi",
  },
  {
    text: "Điều gì không quên thì vĩnh viễn không quên, điều gì sẽ quên thì cố níu giữ cũng vô dụng.",
    author: "Haruki Murakami",
    title: "Rừng Na Uy",
  },
  {
    text: "Tình yêu, giống như lần đầu tiên được nếm thử vị của quả khế mới chín. Chua chua, chát chát, nhưng lại không kìm được vẫn muốn nếm thêm lần nữa. Trong quả khế chát xanh xanh, nụ cười ngốc nghếch ngọt ngào của anh, tình đầu trong sáng của em, lặng lẽ nảy mầm.",
    author: "Lâu Vũ Tình",
    title: "Thất tịch không mưa",
  },
  {
    text: "Chẳng bao giờ có ai trải qua được nỗi đau của người khác, số phận dành cho mỗi người nỗi đau riêng.",
    author: "Colleen McCullough",
    title: "Tiếng chim hót trong bụi mận gai",
  },
  {
    text: "Có mắt mà không nhìn thấy vẻ đẹp, có tai mà không thấy điều hay, có trái tim mà không thấy chân lý, chưa cảm kích thì chưa thể cháy hết mình.",
    author: "Tetsuko Kuroyanagi",
    title: "Totto-chan bên cửa sổ",
  },
  {
    text: "Sau khi đã tìm kiếm, tổn thương và lạc hướng. Chúng ta vẫn có thể tin vào tình yêu như cũ chính là một loại can đảm.",
    author: "Haruki Murakami",
    title: "Rừng Na Uy",
  },
  {
    text: "Có rất ít người thật sự biết yêu, và còn ít hơn những người mà tôi nghĩ là tốt. Càng thấy được thế giới nhiều, tôi càng bất mãn với nó, và mỗi ngày càng xác nhận niềm tin của tôi về sự mâu thuẫn trong nhân cách con người, và sự phụ thuộc nhỏ nhoi có thể đặt trên những điều tốt đẹp hay ý nghĩa.",
    author: "Jane Austen",
    title: "Kiêu hãnh và định kiến",
  },
  {
    text: "Chẳng cầu trong những tháng năm đẹp nhất gặp được người tốt nhất, chỉ nguyện những năm còn sống được tương phùng, lựa chọn một tòa thành sống với nhau đến già. Trông một sân đầy cây cỏ, chậm rãi pha trà nhàn nhã, bên nhau trọn đời.",
    author: "",
    title: "Bạch Lạc Mai",
  },
  {
    text: "Không biết là ai đã từng nói, nhân sinh phải lên xuống chìm nổi mới có thể bình an, quá thông thuận trái lại sẽ không được dài lâu. Tin vào câu nói đó, đối mặt với những sự cố bất ngờ sẽ thấy ung dung trấn tĩnh hơn rất nhiều. Những ngày mưa chưa chắc đều là buồn bã, có thể pha một bình trà nhàn nhã, thưởng thức nhân sinh. Lúc trăng khuyết cũng chưa hẳn chỉ toàn sâu thẳm, cũng có thể tựa cửa sổ ngồi lặng yên, dịu dàng hoài niệm cố nhân ở phương xa.",
    author: "Bạch Lạc Mai",
    title: "Bạch Lạc Mai",
  },
  {
    text: "Điều quan trọng nhất của tình yêu không phải là am hiểu mà là cảm nhận. Chính cảm xúc, chứ không phải sự phân tích về cảm xúc, làm nên tình yêu.",
    author: "Nguyễn Nhật Ánh",
    title: "Có hai con mèo ngồi bên cửa sổ",
  },
  {
    text: "Cho đến khi bạn đánh mất danh tiếng, bạn sẽ không bao giờ nhận ra gánh nặng hay tự do thực sự là gì.",
    author: "Margaret Mitchell",
    title: "Cuốn theo chiều gió",
  },
  {
    text: "Vũ trụ này đôi lúc thật kỳ lạ, khi mình cố trốn tránh một ký ức, một con người để rồi lại bắt gặp từng mảnh của ký ức ấy, lác đác, vương vãi ở mọi nơi mình bước qua.",
    author: "Nguyễn Nhật Ánh",
    title: "Mắt biếc",
  },
  {
    text: "Khó khăn sẽ tạo nên hoặc hủy hoại con người.",
    author: "Margaret Mitchell",
    title: "Cuốn theo chiều gió",
  },
  {
    text: "Có một thứ không theo nguyên tắc đa số, đó là lương tâm của con người.",
    author: "Harper Lee",
    title: "Giết con chim nhại",
  },
  {
    text: "Anh yêu em, và anh biết rằng tình yêu chỉ là một tiếng hét vào khoảng không, và sự lãng quên là không thể tránh khỏi, và rằng tất cả chúng ta phải chịu số phận, đến một ngày, khi tất cả những việc ta đã làm trở thành cát bụi, anh biết mặt trời sẽ nuốt chửng trái đất, dù có thế nào thì anh vẫn cứ yêu em.",
    author: "John Green",
    title: "Khi lỗi thuộc về những vì sao",
  },
  {
    text: "Nói chung con người chỉ muốn tìm kiếm những gì họ tìm kiếm, và nghe thấy những gì họ lắng nghe.",
    author: "Harper Lee",
    title: "Giết con chim nhại",
  },
  {
    text: "Những thứ đẹp nhất trên thế giới không thể thấy và chạm vào được, chúng chỉ được cảm nhận bằng trái tim.",
    author: "Antoine de Saint-Exupéry",
    title: "Hoàng tử bé",
  },
  {
    text: "Lời xin lỗi, cứ mỗi lần bị trì hoãn, nó lại càng trở nên khó khăn hơn để nói ra, và cuối cùng là không thể.",
    author: "Margaret Mitchell",
    title: "Cuốn theo chiều gió",
  },
  {
    text: "Trí tưởng tượng của người con gái rất nhanh lẹ; nó nhảy từ sự ngưỡng mộ sang tình yêu, từ tình yêu sang hôn nhân chỉ trong một khoảnh khắc.",
    author: "Jane Austen",
    title: "Kiêu hãnh và định kiến",
  },
  {
    text: "Một buổi sáng, có bao nhiêu người nhận thức được rằng mình thật là may mắn được thức dậy, được trời đất ban cho cả thị giác, xúc giác, thính giác và cả cảm giác? Có bao nhiêu người tạm quên được mọi lo toan để hưởng thụ cảnh tượng diệu kỳ này? Chúng ta phải thấy rằng, sự mất ý thức lớn nhất của con người chính là sự mất ý thức về cuộc sống của chính mình.",
    author: "Marc Levy",
    title: "Nếu em không phải là một giấc mơ",
  },
  {
    text: "Khi ta yêu, điều tự nhiên nhất là hãy tha thiết với nó.",
    author: "Haruki Murakami",
    title: "Rừng Na Uy",
  },
  {
    text: "Cuộc sống không có nghĩa vụ phải trao cho chúng ta những gì ta kỳ vọng. Chúng ta mất những gì chúng ta có và tôi biết ơn vì nó đã không tồi tệ hơn thế.",
    author: "Margaret Mitchell",
    title: "Cuốn theo chiều gió",
  },
  {
    text: "Mọi việc không bao giờ tệ hại như ta tưởng.",
    author: "Harper Lee",
    title: "Giết con chim nhại",
  },
  {
    text: "Mỗi người đều có một bông hoa của riêng mình, một ngôi sao cho riêng mình, và chẳng có ai giống ai. Người cậu yêu là độc nhất, bởi cậu yêu người ấy, vậy thôi. Người ấy quan trọng vì người ấy là tình yêu của cậu.",
    author: "Antoine de Saint-Exupéry",
    title: "Hoàng tử bé",
  },
  {
    text: "Điều khiến sa mạc trở nên đẹp đẽ, là bạn không biết nó ẩn giấu hồ nước mùa xuân ở nơi nào.",
    author: "Antoine de Saint-Exupéry",
    title: "Hoàng tử bé",
  },
  {
    text: "Cuối cùng tôi cũng hiểu ra ý nghĩa của một tình yêu đích thực. Yêu là khi bạn nghĩ về hạnh phúc của người ấy nhiều hơn của chính mình, dù bạn phải đối mặt với sự đau khổ do chính sự lựa chọn của bạn mang lại.",
    author: "Nicholas Sparks",
    title: "Dear John",
  },
  {
    text: "Tình yêu như một cơn gió, bạn không thể thấy nhưng bạn sẽ luôn có thể cảm nhận được.",
    author: "Nicholas Sparks",
    title: "A Walk to Remember",
  },
];

export default quotes;

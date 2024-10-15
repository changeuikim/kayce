const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()];

  let hours = date.getHours();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${meridiem} ${hours}시`;
}

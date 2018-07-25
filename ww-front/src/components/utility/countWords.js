// https://www.mediacollege.com/internet/javascript/text/count-words.html
export default function countWords(string) {
  let s = string;
  s = s.replace(/(^\s*)|(\s*$)/gi, ''); // exclude  start and end white-space
  s = s.replace(/[ ]{2,}/gi, ' '); // 2 or more space to 1
  s = s.replace(/\n /gi, '\n'); // exclude newline with a start spacing
  s = s.replace(/\n/gi, ' '); // exclude newline with a start spacing
  return s.split(' ').length;
}

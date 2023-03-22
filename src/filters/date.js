export default function func(time) {
  const date = new Date(time * 1000);
  return date.toLocaleDateString();
}

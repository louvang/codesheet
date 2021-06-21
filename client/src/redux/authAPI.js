export async function fetchUserPromise() {
  const res = await fetch('/api/current_user');
  const data = await res.json();
  if (res.ok) {
    return data;
  }
}

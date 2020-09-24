export default async function fetchChurchesAPI(coords) {
  const res = await fetch(
    `https://apiv4.updateparishdata.org/Churchs/?lat=${coords.latitude}&long=${coords.longitude}&pg=1`
  );
  const data = await res.json();
  return data;
}

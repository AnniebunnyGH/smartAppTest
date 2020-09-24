export default function updateChurches(churches) {
  const updatedChurches = churches.map((elem) => {
    return {
      type: "Feature",
      properties: {
        description: `<strong>${elem.name}</strong>
          <p>${elem.church_address_street_address}</br>
          <a href='${elem.url} target="_blank" title="Opens in a new window"'>${elem.url}</a></br>
          <a href="${elem.phone_number}">${elem.phone_number}</a></p>
          `,
        info: {
          name: elem.name,
          adress: elem.church_address_street_address,
          url: elem.url,
          tel: elem.phone_number,
        },
        icon: "religious-christian",
      },
      geometry: {
        type: "Point",
        coordinates: [elem.longitude, elem.latitude],
      },
    };
  });
  return updatedChurches;
}

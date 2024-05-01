const getBrothers = async () => {
  return await fetch('/api/brothers/');
}

const getBrotherById = async (id) => {
  return await fetch(`/api/brothers/${id}`)
}

// const addMessage = async (message) => {
//   const payload = new FormData();
//   for(const name in message) {
//     payload.append(name, message[name]);
//   }

//   return await fetch(`${audioMicroservice}/upload-message`, {
//     method: 'POST',
//     body: payload
//   });
// }

const sumSnack = async (id, snack) => {
  return await fetch(`/api/brothers/sum-snack/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ snack })
  });
}

const payDebt = async (id, amount) => {
  return await fetch(`/api/brothers/pay-debt/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount })
  });
}

export default {
  getBrothers,
  getBrotherById,
  sumSnack,
  payDebt
}

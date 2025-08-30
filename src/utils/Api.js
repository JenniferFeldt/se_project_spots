class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
      headers: {
        authorization: "c6b032d7-341c-4d5e-a157-9e62fbe1626d",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  // other methods for working with the API
}

export default Api;

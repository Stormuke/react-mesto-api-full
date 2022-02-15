class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _handleRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(console.log(`Ошибка: ${res.status}`))
  }

  _getHeaders() {
    const jwt = localStorage.getItem("jwt");
    return {
      "Authorization" : `Bearer ${jwt}`,
      ...this._headers
    }
  }

  //запрос пользовательских данных
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders()
    })
      .then((res) => {
        return this._handleRes(res)
      })
  }

  //запрос карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders()
    })
      .then((res) => {
        return this._handleRes(res)
      })
  }

  //отправка новых данных профиля
  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.profile_name,
        about: data.profile_job
      })
    })
      .then((res) => {
        return this._handleRes(res)
      })
  }

  //отправка создания новой карточки
  postNewCard(user) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: user.name,
        link: user.link
      })
    })
      .then((res) => {
        return this._handleRes(res)
      })
  }

  //запрос удаления карточки
  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then((res) => {
        return this._handleRes(res)
      })
  }

  //постановка лайка
  addCardLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
      .then((res) => {
        return this._handleRes(res)
      });
  }

  //удаление лайка
  deleteCardLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then((res) => {
        return this._handleRes(res)
      })
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar_link
      })
    })
      .then((res) => {
        return this._handleRes(res)
      })
  }
}

const api = new Api({
  baseUrl: 'http://api.stormuke.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api

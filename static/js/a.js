const log = console.log.bind(console)

const e = selector => document.querySelector(selector)

const bindEventLogin = () => {
    let button = e('#id-button-login')
    let box = e('.box')

    button.addEventListener('click', (event) => {
        box.classList.add('pink')
    })
}

const bindEvents = () => {
    bindEventLogin()
}

const __main = () => {
    bindEvents()
    log('hello javascript');
}

__main()

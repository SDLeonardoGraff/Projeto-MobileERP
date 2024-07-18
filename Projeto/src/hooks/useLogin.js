const useLogin = () => {

    const login = async (email, senha) => {
        try {
            const resposta = await fetch('https://backend.sdbr.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': email,
                    'password': senha,
                }),
            })
            const dados = await resposta.json();
            return dados;
        } catch (error) {
            alert(error);
        }
    };

    return {
        login
    }

}

export default useLogin;
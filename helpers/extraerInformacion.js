function extraerInformacion(user, clte) {
    const info = {
        'usuario': {
            'value': '',
            'data': user
        },
        'cliente': {
            'value': '',
            'data': clte
        }
    }

    Object.keys(info).forEach(key => {
        const element = info[key];
        if (element.data.tipo === 'empresa') {
            element.value = element.data.razonSocial;
        } else if (element.data.tipo === 'persona') {
            if (element.data.nombreComercial !== '') {
                element.value = element.data.nombreComercial;
            } else {
                element.value = `${element.data.nombres} ${element.data.apellidos}`;
            }
        }
    });

    return { nameUsuario: info.usuario.value, nameCliente: info.cliente.value };
}


export default extraerInformacion

const Joi = require('joi');

module.exports = {
    modeloLogin: Joi.object().keys({
        email: Joi.string().email().required().max(100),
        pass: Joi.string().required().min(8).max(20),
    }),

    modeloRegistro: Joi.object().keys({
        nombres: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(60),
        apellidos: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(60),
        email: Joi.string().email().required().max(100),
        pass: Joi.string().required().min(8).max(20),
        nacimiento: Joi.date().required(),
        pais: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(20),
        ciudad: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(20),
    }),

    modeloActualizar: Joi.object().keys({
        nombres: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(60),
        apellidos: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(60),
        email: Joi.string().email().required().max(100),
        pass: Joi.string().required().min(8).max(20),
        fecha: Joi.date().required(),
        pais: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(20),
        ciudad: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required().min(3).max(20),
    }),

    modeloHabilidades: Joi.object().keys({
        habilidades: Joi.array().items(
            Joi.object().keys({
                habilidad: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(50).required(),
            })
        )
    }),

    modeloEntornos: Joi.object().keys({
        entornos: Joi.array().items(
            Joi.object().keys({
                entorno: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(50).required(),
            })
        )
    }),

    modeloTecnologias: Joi.object().keys({
        tecnologias: Joi.array().items(
            Joi.object().keys({
                tecnologia: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(50).required(),
            })
        )
    }),

    modeloDesempenios: Joi.object().keys({
        actividades: Joi.array().items(
            Joi.object().keys({
                actividad: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(50).required(),
            })
        )
    }),

    modeloConocimientos: Joi.object().keys({
        conocimientos: Joi.array().items(
            Joi.object().keys({
                conocimiento: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(50).required(),
            })
        )
    }),

    modeloIdiomas: Joi.object().keys({
        idiomas: Joi.array().items(
            Joi.object().keys({
                idioma: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(20).required(),
                nivel: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(20).required(),
            })
        )
    }),

    modeloRedes: Joi.object().keys({
        redes: Joi.array().items(
            Joi.object().keys({
                red: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(30).required(),
                enlace: Joi.string().required().max(300),
            })
        )
    }),

    modeloEstudios: Joi.object().keys({
        estudios: Joi.array().items(
            Joi.object().keys({
                escuela: Joi.string().alphanum().required().max(150),
                especialidad: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(100).required(),
            })
        )
    }),

    modeloHobbies: Joi.object().keys({
        hobbies: Joi.array().items(
            Joi.object().keys({
                hobbie: Joi.string().regex(/^[ .a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).max(35).required(),
            })
        )
    }),
}
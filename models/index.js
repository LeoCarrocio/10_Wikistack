var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging : false
});
function generateUrlTitle (title) {
    if (title) {
      // Remueve todos los caracteres no-alfanuméricos 
      // y hace a los espacios guiones bajos. 
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      // Generá de forma aleatoria un string de 5 caracteres
      return Math.random().toString(36).substring(2, 7);
    }
  }

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    route : { // se creo otro campo de ruta 
        type: Sequelize.VIRTUAL,
        get(){
            return '/wiki/' + this.getDataValue('urlTitle');
        }
    },
},
{           // es muy importante que sea otro objeto aparte hooks y geters y seters, pueden convivir en el  
    hooks:{ // son ganchos que siempre se ejecutan una vez cargada la base de datos y modifican el campo que se le pase.
        beforeValidate:(page)=>{
            page.urlTitle= generateUrlTitle(page.title)
        }
    }
    
});
var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

});

Page.belongsTo(User , { as: 'autor' })

module.exports = {
  db: db,
  Page: Page,
  User: User
};

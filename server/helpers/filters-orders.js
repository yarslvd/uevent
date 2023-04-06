const Sequelize = require('sequelize')


const filterOrganizerName = (name) => {
  return {
    attributes : [
      'id', 'user_id', 'name', 'email'
    ],
    where: {
      name: {[Sequelize.Op.like]: `%${name}%`}
    }
  }
}

const filterEventId = (eventIds) => {
    return {
        where : {
            'event_id' : JSON.parse(eventIds)
        }
    }
};

const filterUserId = (userId) => {
    return {
        where : {
            'user_id' : userId
        }
    }
};
const filterOrganizerId = (organizerIds) => {
    return {
        where : {
            'organizer_id' : JSON.parse(organizerIds)
        }
    }
};

const byDate = (order) => { //DESC ASC
    return {
        order : ['publish_date', order]
    } 
};

const filterDateBetween = (from, to) => { //EXAMPLE '2022-09-24' - '2022-09-25'
    if (Date.parse(to) > Date.parse(from)) {
        from = [to, to = from][0];
    }
    return {
        where : {
            date :{
                [Sequelize.Op.between] : [from, to]
            }
        }
    }
};

const filterPriceBetween = (from, to) => {
    if (to > from) {
        from = [to, to = from][0];
    }
    return {
        where : {
            price :{
                [Sequelize.Op.between] : [from, to]
            }
        }
    }
};



function filterCategory (modelCategory, categoriesArr) {  //EXAMPLE categories [`javascript`, `js`]
    console.log(categoriesArr);
    return {
        attributes: [
            'id', 'author', 'title',
            'publish_date', 'status',
            'content', 'categories',
        ],
        include: [{
            model : modelCategory, 
            required: true,
            as : 'categoryID',
            attributes : [],
            where: { 
                title : categoriesArr,
            },
            through: {
                attributes: []
            },
        }],
        group : "posts.id",
        having : Sequelize.literal(`COUNT(*)=${categoriesArr.length}`),
    }
}

module.exports = {
    byDate,

    filterDateBetween,
    filterPriceBetween,
    filterOrganizerId,
    filterEventId,
    filterUserId,
    filterOrganizerName
}
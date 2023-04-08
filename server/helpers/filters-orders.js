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
            'organizer_id' : JSON.parse(organizerIds)
    }
};

const byDate = (order) => { //DESC ASC
    return {
        order : ['publish_date', order]
    } 
};

const filterDateBetween = (from, to) => { //EXAMPLE '2022-09-24' - '2022-09-25'
    if (Date.parse(from) > Date.parse(to)) {
        from = [to, to = from][0];
    }
    return {
        date :{
            // [Sequelize.Op.between] : [from, to]
            ...(from ? {[Sequelize.Op.gte]:from} : {}),
            ...(to ? {[Sequelize.Op.lte]:to} : {})
        }
    }
};

const filterPriceBetween = (from, to) => {
    if (+from > +to) {
        from = [to, to = from][0];
    }
    return {
        price :{
            [Sequelize.Op.between] : [from, to]
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

function filterColumnValue(columnName, value) {
    return {
        [columnName]: value
    }
}

function filterStringIncludes(columnName, str) {
    return {
        [columnName]: {
            [Sequelize.Op.like]: `%${str}%`
        }
    }
}

function filterInArray(columnName, arr) {
    return {
        [columnName]: {
            [Sequelize.Op.in]: arr
        }
    }
}

module.exports = {
    byDate,

    filterInArray,
    filterDateBetween,
    filterPriceBetween,
    filterOrganizerId,
    filterEventId,
    filterUserId,
    filterOrganizerName,
    filterColumnValue,
    filterStringIncludes
}
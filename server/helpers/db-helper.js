async function proccesPagination (url, path, model, limit, page, attr) {
  let all;
  let links;
  let pages;

  const customAttr = { ...attr};

  const { rows } = await model.findAndCountAll(customAttr);

  count = rows.length;
  pages = Math.ceil(count / limit);

  if (count > limit) {
      customAttr.limit = limit;
      customAttr.offset = page * limit;
  }

  all = await model.findAndCountAll(customAttr);

  let prev = page - 1;
  if (page == 0) {
      prev = 0;
  } 

  let next = page + 1;
  if (page + 1 === pages) {
      next = page;
  }


  links = {
      prev: `${url}${path.replace(`page=${page}`,`page=${prev}`)}`,
      self: `${url}${path.replace(`page=${page}`,`page=${page}`)}`,
      next: `${url}${path.replace(`page=${page}`,`page=${next}`)}`
  }
  
  all.count = count; //category filter breaks it down (fuck)
  all.links = links;
  all.pages = pages;

  return all;
}

module.exports = {
  proccesPagination
}
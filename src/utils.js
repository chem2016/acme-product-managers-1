export const findManagers = ({ users, products})=> {
  return users.filter( user => products.find(p => p.managerId === user.id ));
};

export const openings = ({ users, products })=> {
  return !!products.find( product => !product.managerId);
};


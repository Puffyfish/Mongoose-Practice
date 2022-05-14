1. path/views(app.set)
2. port(app.listen)
3. templating/view engine(app.set)
4. data are parsed(app.use)
5. require model(/models/index)
6. seed data(import model)


CRUD
7. homepage/show page
8. creating new product
	a. get route
	b. post route
9. updating product
	a. get route
	b. put route(method-override, collection.findByIdAndUpdate(id, req.body, {runValidators: true})
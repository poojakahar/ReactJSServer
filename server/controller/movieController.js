let { con } = require('./../db/connect');

exports.getAll = (req,res) => {
  con.query("SELECT * from movies", (err, response) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(response)
  });
};

exports.getOne = (req,res) => {
  let id = req.params.id;

  con.query("SELECT * from movies where id = " + id, (err, response) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(response)
  });
};

exports.new = (req, res) => {
  const {name, description} = req.body;

  con.query("INSERT INTO movies(name,description) values('" + name + "', '" + description + "')", (err, response) => {
    if (err) return res.status(400).json(err);

    con.query("SELECT * from movies where id = " + response.insertId, (err, response) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(response)
    });
  });
};

exports.edit = (req,res) => {
  const {name, description} = req.body;
  const id = req.params.id;


  con.query("UPDATE movies set name = '" + name + "', description = '" + description + "' where id = " + id, (err, response) => {
    if (err) return res.status(400).json(err);

    con.query("SELECT * from movies where id = " + id, (err, response) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(response)
    });

  });
};

exports.remove = (req,res) => {
  const id = req.params.id;

  con.query("DELETE FROM movies where id = " + id, (err, response) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json({id})
  });
};

exports.search = (req,res) => {
  const name = req.query.name;
  con.query("SELECT * from movies where name like '%" + name + "%'", (err, response) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(response);
  });
};

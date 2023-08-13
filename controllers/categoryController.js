const { Validator } = require('node-input-validator');
const  Category = require('../models/category');

const createCategory = async (req, res) => {
    const validation = new Validator(req.body, {
        name: 'required|string|maxLength:60',
        description: 'required|string|maxLength:300'
      });
    
      validation.check().then((matched) => {
        if (!matched) {
          res.status(422).send(validation.errors);
        }
      });
    let newCategory = new Category({
      name: req.body.name,
      description:req.body.description
    })
    newCategory.save();
    res.redirect('/categories/table');
    }

    

// Edit category
    const editCategory = async (req, res) => {
        var item = {
            name: req.body.name,
            description: req.body.description,
           
          };
          Category.findByIdAndUpdate(req.params.id, {$set: item}, function(err, data) {
              if(err){
                  console.log(err);
              }
              else{
                res.redirect('/categories/table')
                  
              }
          });  
      };

      //category table
      const categoryTable = async (req, res) => {
        Category.find({},function(err,categorytable){
            res.render("categoryTable",{
              categoryList:categorytable
            })
              })
            };
           //delete category 
            const deleteCategory = async (req, res) => {
              Category.findByIdAndRemove(req.params.id, (err, doc) => {
                    if (!err) {
                      res.redirect('/categories/table')
                    } else {
                      console.log(err)
                    }
                  })
                }



                Category.getAll = async function () {
                  return await this.find({}, 'name').lean();
                };


    module.exports = {
        createCategory,
        editCategory,
        categoryTable,
        deleteCategory,
      
      }
import { Product, Order, Restaurant, RestaurantCategory, ProductCategory } from '../models/models.js'
import Sequelize from 'sequelize'

const indexRestaurant = async function (req, res) {
  try {
    const products = await Product.findAll({
      where: {
        restaurantId: req.params.restaurantId
      },
      include: [
        {
          model: ProductCategory,
          as: 'productCategory'
        }]
    })
    res.json(products)
  } catch (err) {
    res.status(500).send(err)
  }
}

const show = async function (req, res) {
  // Only returns PUBLIC information of products
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [
        {
          model: ProductCategory,
          as: 'productCategory'
        }]
    }
    )
    res.json(product)
  } catch (err) {
    res.status(500).send(err)
  }
}

const updateRestaurantCareza = async function (restaurantId) {
  const queryResultOtherRestaurantAvgPrice = await Product.findOne({
    where: {
      restaurantId: { [Sequelize.Op.ne]: restaurantId }
    },
    attributes: [
      [Sequelize.fn('AVG', Sequelize.col('price')), 'avgPrice']
    ]
  })

  const queryResultCurrentRestaurantAvgPrice = await Product.findOne({
    where: {
      restaurantId
    },
    attributes: [
      [Sequelize.fn('AVG', Sequelize.col('price')), 'avgPrice']
    ]
  })

  if (queryResultCurrentRestaurantAvgPrice !== null && queryResultOtherRestaurantAvgPrice !== null) {
    const avgPriceOtherRestaurants = queryResultOtherRestaurantAvgPrice.dataValues.avgPrice
    const avgPriceCurrentRestaurant = queryResultCurrentRestaurantAvgPrice.dataValues.avgPrice
    const economico = avgPriceOtherRestaurants > avgPriceCurrentRestaurant
    Restaurant.update({ isEconomic: economico }, { where: { id: restaurantId } })
  }
}

const create = async function (req, res) {
  let newProduct = Product.build(req.body)
  try {
    newProduct = await newProduct.save()
    updateRestaurantCareza(newProduct.restaurantId)
    res.json(newProduct)
  } catch (err) {
    res.status(500).send(err)
  }
}

const update = async function (req, res) {
  try {
    await Product.update(req.body, { where: { id: req.params.productId } })
    const updatedProduct = await Product.findByPk(req.params.productId)
    res.json(updatedProduct)
  } catch (err) {
    res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  try {
    const result = await Product.destroy({ where: { id: req.params.productId } })
    await updateRestaurantCareza(result.restaurantId)
    let message = ''
    if (result === 1) {
      message = 'Sucessfuly deleted product id.' + req.params.productId
    } else {
      message = 'Could not delete product.'
    }
    res.json(message)
  } catch (err) {
    res.status(500).send(err)
  }
}

const popular = async function (req, res) {
  try {
    const topProducts = await Product.findAll(
      {
        include: [{
          model: Order,
          as: 'orders',
          attributes: []
        },
        {
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'description', 'address', 'postalCode', 'url', 'shippingCosts', 'averageServiceMinutes', 'email', 'phone', 'logo', 'heroImage', 'status', 'restaurantCategoryId'],
          include:
        {
          model: RestaurantCategory,
          as: 'restaurantCategory'
        }
        }
        ],
        attributes: {
          include: [
            [Sequelize.fn('SUM', Sequelize.col('orders.OrderProducts.quantity')), 'soldProductCount']
          ],
          separate: true
        },
        group: ['orders.OrderProducts.productId'],
        order: [[Sequelize.col('soldProductCount'), 'DESC']]
      // limit: 3 //this is not supported when M:N associations are involved
      })
    res.json(topProducts.slice(0, 3))
  } catch (err) {
    res.status(500).send(err)
  }
}

const ProductController = {
  indexRestaurant,
  show,
  create,
  update,
  destroy,
  popular
}
export default ProductController

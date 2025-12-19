const User = require('../models/User');
const Holding = require('../models/Holding');
const Transaction = require('../models/Transaction');

// -------------------------
// BUY STOCK SERVICE
// -------------------------

exports.executeBuy = async ({ userId, symbol, quantity, price }) => {
  try {
    quantity = Number(quantity);
    price = Number(price);

    const cost = quantity * price;

    // 1) Find user
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.balance < cost) throw new Error('Insufficient balance');

    // 2) Deduct balance
    user.balance -= cost;
    await user.save();

    // 3) Find holding
    let holding = await Holding.findOne({ userId, symbol });

    if (!holding) {
      // Create holding if not exists
      holding = await Holding.create({
        userId,
        symbol,
        quantity,
        avgBuyPrice: price
      });
    } else {
      // Update average buy price & quantity
      const oldQty = holding.quantity;
      const newQty = oldQty + quantity;

      const newAvgPrice =
        ((oldQty * holding.avgBuyPrice) + (quantity * price)) / newQty;

      holding.quantity = newQty;
      holding.avgBuyPrice = newAvgPrice;
      holding.updatedAt = new Date();
      await holding.save();
    }

    // 4) Create transaction
    await Transaction.create({
      userId,
      symbol,
      type: 'BUY',
      quantity,
      price
    });

    return { success: true };

  } catch (err) {
    console.error("BUY ERROR:", err.message);
    throw err;
  }
};



// -------------------------
// SELL STOCK SERVICE
// -------------------------

exports.executeSell = async ({ userId, symbol, quantity, price }) => {
  try {
    quantity = Number(quantity);
    price = Number(price);

    // 1) Check holding
    const holding = await Holding.findOne({ userId, symbol });
    if (!holding) throw new Error('You do not own this stock');
    if (holding.quantity < quantity) throw new Error('Not enough quantity to sell');

    // 2) Reduce holdings
    holding.quantity -= quantity;
    await holding.save();

    // 3) Add money to balance
    const totalGain = quantity * price;
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.balance += totalGain;
    await user.save();

    // 4) Delete holding if zero quantity
    if (holding.quantity === 0) {
      await Holding.deleteOne({ _id: holding._id });
    }

    // 5) Transaction create
    await Transaction.create({
      userId,
      symbol,
      type: 'SELL',
      quantity,
      price
    });

    return { success: true };

  } catch (err) {
    console.error("SELL ERROR:", err.message);
    throw err;
  }
};

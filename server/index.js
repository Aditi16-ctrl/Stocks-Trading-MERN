import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import {Order, Stock, Transaction, User } from './schema.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const PORT = 6001;
mongoose.connect('mongodb://localhost:27017/Stocks', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(()=>{


    // Register user

    app.post('/register', async (req, res) => {
        const { username, email, usertype, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                usertype,
                password: hashedPassword
            });
            const userCreated = await newUser.save();
            return res.status(201).json(userCreated);
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server Error' });
        }
    });

    // Login user

    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {


            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            } else{
                
                return res.json(user);
            }
            
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Server Error' });
        }
    });


    // deposit money

    app.post('/deposit', async(req, res)=>{
        const {user, depositAmount, depositMode} = req.body;
        try{

            const userData = await User.findById(user);
            if(!userData){
                res.status(500).json({message: 'error occured'});
            }
            const transaction = new Transaction({
                user: user,
                type: 'Deposit',
                paymentMode: depositMode,
                amount: depositAmount,
                time: new Date() 
            })

            await transaction.save();

            userData.balance = parseInt(userData.balance) + parseInt(depositAmount);
            await userData.save();

            res.json(userData);

        }catch(err){
            res.status(500).json({message: 'error occured'});
        }
    });


    // withdraw money

    app.post('/withdraw', async(req, res)=>{
        const {user, withdrawAmount, withdrawMode} = req.body;
        try{

            const userData = await User.findById(user);
            if(!userData){
                res.status(500).json({message: 'error occured'});
            }
            if(userData.balance < withdrawAmount){
                res.status(500).json({message: 'error occured'});
            }
            const transaction = new Transaction({
                user: user,
                type: 'Withdraw',
                paymentMode: withdrawMode,
                amount: withdrawAmount,
                time: new Date()
            })

            await transaction.save();

            userData.balance = parseInt(userData.balance) - parseInt(withdrawAmount);
            await userData.save();

            res.json(userData);

        }catch(err){
            res.status(500).json({message: 'error occured'});
        }
    });
    

    // fetch user

    app.get('/fetch-user/:id', async (req, res)=>{
        try{
            const user = await User.findById(req.params.id);
            res.json(user);
        }catch(err){
            res.status(500).json({message: 'error occured'})
        }
    })

    // transactions

    app.get('/transactions', async(req, res)=>{
        try{
            const transactions = await Transaction.find();

            res.json(transactions);
        }catch(err){
            res.status(500).json({message: 'error occured'});
        }
    })


    // buy stock

    app.post('/buyStock', async(req, res)=>{
        const {user, symbol, name, stockType, stockExchange, price,  count, totalPrice} = req.body;
        try{
            const stock = await Stock.findOne({_id: user, symbol});
            const userData = await User.findById(user);

            if(parseInt(userData.balance) >= parseInt(totalPrice)){

                if (stock){
                    stock.price = (parseInt(stock.price) + parseInt(price))/( parseInt(stock.count) + parseInt(count));
                    stock.count = parseInt(stock.count) + parseInt(count);
                    stock.totalPrice = parseInt(stock.totalPrice) + parseInt(totalPrice);
                    await stock.save();
                }else{
                    const newStock = new Stock({
                        user, symbol, name, price, count, totalPrice, stockExchange
                    })
                    await newStock.save();
                }
                userData.balance = parseInt(userData.balance) - parseInt(totalPrice);
                const newOrder = new Order({
                    user, symbol, name, stockType, price,  count, totalPrice, orderType: 'Buy', orderStatus: 'Completed'
                })
                await userData.save();
                await newOrder.save();
                res.status(201).json({message: "success"});
            }else{
                res.status(500).json({message: 'error occured'});
            }

        }catch(err){
            res.status(500).json({message: 'error occured'});
        }
    });


    // sell stock

    app.post('/sellStock', async(req, res)=>{
        const {user, symbol, name, stockType, price,  count, totalPrice} = req.body;
        try{
            const stock = await Stock.findOne({user: user, symbol});
            const userData = await User.findById(user);
            if (stock){

                if(parseInt(stock.count) > parseInt(count)){
                    stock.count = parseInt(stock.count) - parseInt(count);
                    stock.totalPrice = parseInt(stock.totalPrice) - parseInt(totalPrice);
                    userData.balance = parseInt(userData.balance) + parseInt(totalPrice);
                    await stock.save();
                }else if(parseInt(stock.count) === parseInt(count)){
                    await Stock.deleteOne({user: user, symbol});
                } else{
                    res.status(500).json({message: 'error occured'});
                }
                
            }else{
                res.status(404).json({message: 'no stocks'});
            }

            const newOrder = new Order({
                user, symbol, name, stockType, price,  count, totalPrice, orderType: 'Sell', orderStatus: 'Completed'
            })
            await newOrder.save();
            res.status(201).json({message: "success"});
        }catch(err){
            res.status(500).json({message: 'error occured'});
        }
    });


    // Orders

    app.get('/fetch-orders', async(req, res)=>{
        try{
            const orders = await Order.find();

            res.json(orders);
        }catch(err){
            res.status(500).json({message: 'error occured'});
        }
    })

    // Stocks

    app.get('/fetch-stocks', async(req, res)=>{
        try{
            const stocks = await Stock.find();

            res.json(stocks);
        }catch(err){
            res.status(500).json({message: 'error occured'});
        }
    })


    // Users

    app.get('/fetch-users', async(req, res)=>{
        try{
            const users = await User.find();

            res.json(users);
        }catch(err){
            res.status(500).json({message: 'error occured'});
        }
    })




    app.listen(PORT, ()=>{
        console.log(`Running @ ${PORT}`);
    });
}
).catch((e)=> console.log(`Error in db connection ${e}`));
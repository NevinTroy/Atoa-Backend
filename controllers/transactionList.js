// Description: This file contains the function that handles the transaction list request
// The user is authenticated using the access token via the auth middleware
// If the user is authenticated, the transaction list is sent back to the client
// The transaction query params are used to determine the page number and the number of items per page
// If the transactionID query param is present, the transaction with that ID is sent back to the client
// Else the transaction list is sent back to the client with the page number and no of items per page is sent

const handleTransactionList=(req,res,db)=>{ 
    const page=parseInt(req.query.page);
    const noOfItems=parseInt(req.query.noOfItems);
    const transactionID=parseInt(req.query.transactionID);

    if(!transactionID){
        const startIndex=(page-1)*noOfItems;
        const endIndex=page*noOfItems;
        
        db
        .select('name','image_url','amount','type','currency')
        .from('TRANSACTIONS')
        .whereBetween('id',[startIndex,endIndex])
        .then(data=>{
            res.json({
                pageNumber: page,
                data: data
            });
        })
        .catch(err=>{
            res.send(err);
        })
    }
    else{
        db
        .select('name','image_url','amount','type','currency')
        .from('TRANSACTIONS')
        .where('id','=',transactionID)
        .then(data=>{
            res.json(data[0]);
        })
        .catch(err=>{
            res.send('Couldn\'t find transaction '+err);
        })   
    }
}   

module.exports={
    handleTransactionList
}
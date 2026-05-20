// arr=[1,2,3,4,5]
// arr.map((item,index) => {
//     if(index==arr.length-1 || index==0)
//     {
//         console.log(item)
//     }
//     else
//     {
//         console.log(item*2)
//     }
// })
// arr=[1,2,3,4,5]
// let max=Math.max(...arr)
// console.log(max)
let arr = [1,2,2,3,4,4,5]

let duplicates = []

for(let i=0; i<arr.length; i++)
{
    for(let j=i+1; j<arr.length; j++)
    {
        if(arr[i] === arr[j])
        {
            if(!duplicates.includes(arr[i]))
            {
                duplicates.push(arr[i])
            }
        }
    }
}

console.log(duplicates)
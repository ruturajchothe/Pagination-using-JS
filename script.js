var request = new XMLHttpRequest();

request.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json', true);

request.send();

request.onload = function(){
    const data = JSON.parse(this.response);
    //console.log(data)

    const table_element = document.getElementById('data-table');
    const pagination_element = document.getElementById('pagination');

    let current_page = 1;
    let rows = 15;
    
    function DisplayData(data_arr, wrapper, rows_per_page, page_num) {
        wrapper.innerHTML = '';
        page_num--;
        
        let start = rows_per_page * page_num;
        let end = start + rows_per_page;
        let paginated_data = data_arr.slice(start, end);

        for(let i = 0; i < paginated_data.length; i++){
            let current_data = paginated_data[i];

            let data_list = document.createElement('ul');
            data_list.classList.add('item');
            data_list.appendChild(createListItem('id', current_data.id));
            data_list.appendChild(createListItem('Name', current_data.name));
            data_list.appendChild(createListItem('email', current_data.email));

            wrapper.appendChild(data_list);
        }
    }

    function pagination_setup(data_arr, wrapper, rows_per_page) {
        wrapper.innerHTML = "";
        let page_count = Math.ceil(data_arr.length / rows_per_page);
        for(let i = 1; i < page_count + 1; i++){
           let btn = Button(i, data_arr);
           wrapper.appendChild(btn)
        }
    }

    function Button(page, data_arr){
        let btn = document.createElement('button');
        btn.innerText = page;

        if(current_page == page) btn.classList.add('active');
        
        btn.addEventListener('click', function () {
            current_page = page;
            DisplayData(data_arr, table_element, rows, current_page)

            let current_button = document.querySelector('.pagination button.active');
            current_button.classList.remove('active');
            btn.classList.add('active');
        })

        return btn;
    }

    function createListItem(key, value) {
        let li = document.createElement('li');
        li.textContent = key + ': ' + value;
        return li;
    }


    DisplayData(data, table_element, rows, current_page);
    pagination_setup(data, pagination_element, rows);



}



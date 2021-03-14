class Masonry {
    constructor(mainClass, config) {
        this.mainClass = mainClass;
        this.init(config);
    }
    init(config) {
        const {
            itemName = '.item',
            itemMargin = 5 } = config;
        let reload = false;
        // main class container
        const container = document.querySelector(this.mainClass),
            // all items
        item = container.querySelectorAll(itemName);
        if (container == undefined || item == undefined) return
        item.forEach(el=>el.style.opacity = 0)
        const item_length = item.length,
            margin = itemMargin;
        window.onresize = function () {
            generar();
        }
        // complete loading images
        for(let i = 0; i < item_length;i++){
            const c_img = new Image();
            c_img.src = item[i].querySelector('img').src;
            c_img.onload = () => {
                if (i >=  item_length - 1) {
                    setTimeout(()=>{
                        generar();
                    },100)
                }
        }
    }
        function generar() {
            let item_row_count = 0,
                maxHeightRow = 0,
                maxHeight = [],
                arry_y = [],
                arry_x = [],
                min_y = 0,

                current_item_width = item[0].clientWidth + margin,

                width_container = container.clientWidth,

                total_row_items = parseInt((width_container) / current_item_width);
            item.forEach((el, index) => {
                if (index < total_row_items) {
                    arry_x.push((current_item_width * index) + parseInt((width_container - (current_item_width * total_row_items)) / 2));
                    arry_y.push(0);
                    if (arry_x.length >= total_row_items) {
                        min_y = Math.min(...arry_y);
                    }
                    el.style = `position:absolute;left:${arry_x[index]}px;top:${min_y}px;transition:all 600ms ease;`;
                    maxHeight.push(el.offsetHeight + margin);
                }
                if (index >= total_row_items) {
                    if (item_row_count >= total_row_items) {
                        item_row_count = 0;
                        maxHeightRow += Math.max(...maxHeight);
                    }
                    maxHeight[item_row_count] += el.offsetHeight + margin;
                    let prevItemCalc = parseInt(index - total_row_items),
                        prevItem = item[prevItemCalc];
                    arry_y[item_row_count] += prevItem.offsetHeight + margin;
                    let top = arry_y[item_row_count];
                    el.style = `position:absolute;left:${arry_x[item_row_count]}px;top:${top}px;transition:all 600ms ease;`;
                    item_row_count++;
                }
                if (index >= item_length - 1) {
                    container.style.height = `${Math.max(...maxHeight)}px`;
                    setTimeout(()=>{
                        document.querySelector('.indicator').remove();
                        container.style.opacity = 1;
                    },100)
            }
            })
        }
    }
}

export default Masonry;


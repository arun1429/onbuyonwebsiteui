const fs = require('fs'),
    convert = require('xml-js'),
    fetch = require('node-fetch'),
    moment = require('moment'),
    hostBlogBaseURL = 'https://onbuyon.in/blogs',
    hostCategoryBaseURL = 'https://onbuyon.in/products',
    hostProductBaseURL = 'https://onbuyon.in/product-details',
    getBlogsListURL = `https://api.toq.co.in/api/user/blogs/listweb/`,
    getProductListURL = `https://api.toq.co.in/api/user/products/getproductsweb?shopName=All`,
    getCategoryListURL = `https://api.toq.co.in/api/user/categories/category/listvendor?shopName=All`,
    untrackedUrlsList = [],
    options = { compact: true, ignoreComment: true, spaces: 4 };

/*
    Method to Fetch dynamic List of URLs from Rest API/DB
*/
const fetchBlogsList = () => {
    fetch(getBlogsListURL)
        .then(res => res.json())
        .then(dataJSON => {
            if (dataJSON) {
                dataJSON.data.forEach(element => {
                    const modifiedURL = element.blogTitleLink;
                    untrackedUrlsList.push(`${hostBlogBaseURL}/${modifiedURL}`);
                });
                filterUniqueURLs();
            }
        })
        .catch(error => {
            console.log(error);
        });

        fetch(getCategoryListURL)
        .then(res => res.json())
        .then(dataJSON => {
            if (dataJSON) {
                dataJSON.data.forEach(element => {
                    const modifiedURL = element.categorySlug;
                    untrackedUrlsList.push(`${hostCategoryBaseURL}/${modifiedURL}`);
                    element.subCategory.forEach(elementchild => {
                        const modifiedURL = elementchild.subCategorySlug;
                        untrackedUrlsList.push(`${hostCategoryBaseURL}/${modifiedURL}`);
                    });
                });
                filterUniqueURLs();
            }
        })
        .catch(error => {
            console.log(error);
        });

        fetch(getProductListURL)
        .then(res => res.json())
        .then(dataJSON => {
            if (dataJSON) {
                dataJSON.data.forEach(element => {
                    const modifiedURL = element.variantSlug;
                    untrackedUrlsList.push(`${hostProductBaseURL}/${modifiedURL}`);
                });
                filterUniqueURLs();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/*
    Method to Filter/Unique already existing URLs and new urls we fetched from DB
*/
const filterUniqueURLs = () => {
    fs.readFile('src/sitemap.xml', (err, data) => {
        if (data) {
            const existingSitemapList = JSON.parse(convert.xml2json(data, options));
            let existingSitemapURLStringList = [];
            if (existingSitemapList.urlset && existingSitemapList.urlset.url && existingSitemapList.urlset.url.length) {
                existingSitemapURLStringList = existingSitemapList.urlset.url.map(ele => ele.loc._text);
            }

            untrackedUrlsList.forEach(ele => {
                if (existingSitemapURLStringList.indexOf(ele) == -1) {
                    existingSitemapList.urlset.url.push({
                        loc: {
                            _text: ele,
                        },
                        changefreq: {
                            _text: 'daily'
                        },
                        priority: {
                            _text: 0.8
                        },
                        lastmod: {
                            _text: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                        }
                    });
                }
            });
            createSitemapFile(existingSitemapList);
        }
    });
}

/*
    Method to convert JSON format data into XML format
*/
const createSitemapFile = (list) => {
    const finalXML = convert.json2xml(list, options); // to convert json text to xml text
    saveNewSitemap(finalXML);
}

/*
    Method to Update sitemap.xml file content
*/
const saveNewSitemap = (xmltext) => {
    fs.writeFile('src/sitemap.xml', xmltext, (err) => {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

fetchBlogsList();
const faker = require('faker');

// creating 10,000 fake items
const itemsData = [
	{
		item_name: 'Wine RANDOM Face Mask with clear and red rhinestones',
	},
	{
		item_name: 'washable Face Mask covering with glitter rose gold glitter Custom made, Designer FaceMask, with NO pocket for filter, mask holder lanyard',
	},
	{
		item_name: 'Hanging with my Gnomies face mask made of clear, green and red rhinestones',
	},
	{
		item_name: 'FaceMask mask holder lanyard, washable Face Mask covering with glitter rose gold glitter Custom made, Designer with NO pocket for filter',
	},
	{
		item_name: 'Face Shield with Flippable Face Shield - PPE - Comfortable Elastic Head Band - Full Cover Safety Cover',
	},
	{
		item_name: 'Winter Soldier type of PPE covid -19 mask',
	},
	{
		item_name: 'Halloween Collection, Holiday, Covid PPE, Fall, Thanksgiving, Scrub cap, surgical cap, nurse, doctor, dentist, men, women, buttons,',
	},
	{
		item_name: 'HStar Wars Collection, Mandalorian, Covid PPE, Yoda, The Child, Scrub cap, surgical cap, nurse, doctor, dentist, men, women, buttons,',
	},
	{
		item_name: 'FTP Face Mask Covering Reusable | Hype Beast Hip-Hop Rap Street Wear SuicideBoys Travis Scott Cactus Jack COVID PPE Designer Brand',
	},
	{
		item_name: 'Dry-Fit Moisture-Wicking Adult Face Masks',
	},
];

const getFakeItem = () => {
  const itemName = faker.lorem.sentence(nb_words=15);
  const itemJson = {
    item_name: itemName,
  };

  return (itemJson);
};

module.exports.itemsData = itemsData;
module.exports.getFakeItem = getFakeItem;

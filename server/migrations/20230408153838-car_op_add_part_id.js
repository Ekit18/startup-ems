/* eslint-disable no-undef */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('car_operations', 'partId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'parts',
        key: 'partId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('car_operations', 'partId');
  }
};

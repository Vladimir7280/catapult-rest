/*
 * Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
 * Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
 * All rights reserved.
 *
 * This file is part of Catapult.
 *
 * Catapult is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Catapult is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Catapult.  If not, see <http://www.gnu.org/licenses/>.
 */

/** @module plugins/price */
const EntityType = require('../model/EntityType');
const ModelType = require('../model/ModelType');
const sizes = require('../modelBinary/sizes');

const constants = { sizes };

/**
 * Creates an price plugin.
 * @type {module:plugins/CatapultPlugin}
 */
const pricePlugin = {
	registerSchema: builder => {
		builder.addTransactionSupport(EntityType.price, {
			blockHeight: ModelType.uint64,
			highPrice: ModelType.uint64,
			lowPrice: ModelType.uint64
		});

	},

	registerCodecs: codecBuilder => {
		codecBuilder.addTransactionSupport(EntityType.price, {
			deserialize: parser => {
				const transaction = {};
				transaction.blockHeight = parser.uint64();
				transaction.highPrice = parser.uint64();
				transaction.lowPrice = parser.uint64();
				return transaction;
			},

			serialize: (transaction, serializer) => {
				serializer.writeUint64(transaction.blockHeight);
				serializer.writeUint64(transaction.highPrice);
				serializer.writeUint64(transaction.lowPrice);
			}
		});


	}
};

module.exports = pricePlugin;

module.exports.isMemberBotAdmin = ( member ) => {
	let userRoleSet = new Set([...member.roles.cache.values()].map( role => role.name.toLowerCase() ));
	return process.env.BOT_ADMIN_ROLE.split` `.some( roleName => userRoleSet.has( roleName.toLowerCase() ) );
}

module.exports.isPCiMember = ( member ) => {
	let userRoleSet = new Set([...member.roles.cache.values()].map( role => role.name.toLowerCase() ));
	return process.env.BOT_MEMBER_ROLE.split` `.some( roleName => userRoleSet.has( roleName.toLowerCase() ) );
}

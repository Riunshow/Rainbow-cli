#!/usr/bin/env node

/**
 * fully implement the FIGfont spec in JavaScript
 * 
 * https://github.com/patorjk/figlet.js
 */
const figlet = require('figlet')

/**
 * 控制终端输出字符串的样式
 * Terminal string styling done right
 * 
 * https://github.com/chalk/chalk
 */
const chalk = require('chalk')

/**
 * 终端交互
 * 
 * https://github.com/SBoudrias/Inquirer.js
 */
const inquirer = require('inquirer')

/**
 * 实现 loading
 * 
 * https://github.com/sindresorhus/ora
 */
const ora = require('ora')

/**
 * Download and extract a git repository (GitHub, GitLab, Bitbucket) from node.
 * 
 * https://github.com/flipxfx/download-git-repo
 */
const download = require('download-git-repo')


// print logo
figlet('By   Rainbower', {
	// font: 'Sweet',
	horizontalLayout: 'fitted',
	verticalLayout: 'fitted'
}, function(err, data) {
	if (err) {
			console.log('Something went wrong...')
			console.dir(err)
			return
	}
	console.log(data)
})

setTimeout(() => {
	console.log('\n' + chalk.yellow('请选择你需要的功能, 稍后将为您生成一套您需要的模板 ^.^') + '\n')
	console.log(chalk.green('默认功能为: \n1.直播功能 \n2.房间管理功能 \n3.用户管理功能 \n'))
	
	// 设置交互问题与选项
	var questions = [
		// 是否需要弹幕功能
		{
			type: 'confirm',
			name: 'danmu',
			message: '是否需要弹幕功能?',
			default: false
		},
		// 是否需要礼物功能
		{
			type: 'confirm',
			name: 'gift',
			message: '是否需要礼物功能?',
			default: false
		},
		{
			type: 'expand',
			name: 'expand',
			message: '测试 expand',
			choices: [
				{
					key: '1',
					name: 'name1',
					value: 'value1'
				},
				{
					key: '2',
					name: 'name2',
					value: 'value2'
				},
				{
					key: '3',
					name: 'name3',
					value: 'value3'
				},
			]
		}
	]

	inquirer.prompt(questions).then(answers => {
		// 获取选项
		const jsonAns = answers
		console.log(jsonAns)

		// 展示loading

		const spinner = ora('downloading')

		if (jsonAns.danmu && !jsonAns.gift) {
			spinner.text = '弹幕功能开启, 礼物功能关闭'
		}else if (!jsonAns.danmu && jsonAns.gift) {
			spinner.text = '弹幕功能关闭, 礼物功能开启'
		}else if (jsonAns.danmu && jsonAns.gift) {
			spinner.text = '弹幕功能开启, 礼物功能开启'
		}else {
			spinner.text = '弹幕功能关闭, 礼物功能关闭'
		}

		spinner.start()

		// 开始下载
		// flipxfx/download-git-repo-fixture
		download('flipxfx/a', 'test/tmp', function (err) {
			if (err) {
				spinner.fail()
				console.log('\n' + chalk.red('模板生成失败, 请检查网络是否有问题, 如有疑问请联系 zhubotaigg@gmail.com' + '\n' + '感谢您的支持 ^.^' + '\n'));
			}else {
				spinner.succeed()
				console.log('\n' + chalk.yellow('模板生成成功, 感谢您的支持 ^.^' + '\n'));
			}
		})

	})


}, 200)

require 'rubygems'
require 'crxmake'

desc 'make chrome extension'
task 'crxmake' do
  # create crx
  CrxMake.make(
               :ex_dir => "./src",
               #:pkey   => "./src.pem",
               :crx_output => "./package/remp-chrome-extension.crx",
               :verbose => true,
               :ignorefile => /\.swp/,
               :ignoredir => /\.(?:svn|git|cvs)/
               )
  
  # create zip for Google Extension Gallery
  CrxMake.zip(
              :ex_dir => "./src",
              #:pkey   => "./src.pem",
              :zip_output => "./package/remp-chrome-extension.zip",
              :verbose => true,
              :ignorefile => /\.swp/,
              :ignoredir => /\.(?:svn|git|cvs)/
              )
end

task :default => [:crxmake]
